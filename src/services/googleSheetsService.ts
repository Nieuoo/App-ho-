import {
  RegisteredStudent,
  StudentProfile,
  ExerciseScoreRecord,
  MiniTestScoreRecord,
  GoogleSheetsConfig,
} from '../types/chemistry';
import { getAccessToken } from './googleAuth';

const STORAGE_KEYS = {
  SHEETS_CONFIG: 'chem_sheets_config_v1',
  REGISTERED_STUDENTS: 'chem_registered_students_v1',
  EXERCISE_SCORES: 'chem_exercise_scores_v1',
  TEST_SCORES: 'chem_test_scores_v1',
};

// Default seed students for initial demonstration
const DEFAULT_STUDENTS: RegisteredStudent[] = [
  {
    fullName: 'Trần Minh Tuấn',
    className: '10Ti',
    studentNo: '06',
    pin: '1234',
    registeredAt: '2026-10-10 08:30:00',
    lastLoginAt: '2026-10-14 07:15:00',
    maxMcCorrect: 15,
    maxTfCorrect: 4,
    maxSaCorrect: 3,
    maxTestScore10: 10,
    maxTestRawScore: 18,
  },
  {
    fullName: 'Lê Hoàng Phương Linh',
    className: '10H',
    studentNo: '18',
    pin: '1234',
    registeredAt: '2026-10-11 09:12:00',
    lastLoginAt: '2026-10-13 14:20:00',
    maxMcCorrect: 13,
    maxTfCorrect: 3,
    maxSaCorrect: 2,
    maxTestScore10: 8.5,
    maxTestRawScore: 15,
  },
];

export class GoogleSheetsService {
  private config: GoogleSheetsConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  // Load configured spreadsheet from localStorage
  public loadConfig(): GoogleSheetsConfig | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHEETS_CONFIG);
      if (saved) {
        this.config = JSON.parse(saved);
        return this.config;
      }
    } catch (e) {
      console.warn('Failed to parse sheets config:', e);
    }
    return null;
  }

  public getConfig(): GoogleSheetsConfig | null {
    return this.config || this.loadConfig();
  }

  public setConfig(config: GoogleSheetsConfig | null) {
    this.config = config;
    if (config) {
      localStorage.setItem(STORAGE_KEYS.SHEETS_CONFIG, JSON.stringify(config));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SHEETS_CONFIG);
    }
  }

  // Extract Spreadsheet ID from standard Google Sheets URL or raw ID
  public parseSpreadsheetId(input: string): string {
    const trimmed = input.trim();
    const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
    return trimmed;
  }

  // Automatically create a brand new Google Spreadsheet in the user's Google Drive
  // NOTE: `_BaoMat_MaPIN` is created with { hidden: true } so it is completely hidden from viewers,
  // while `TaiKhoan_HocSinh` contains no PIN column.
  public async createNewSpreadsheet(title?: string): Promise<GoogleSheetsConfig> {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Chưa có quyền xác thực Google. Vui lòng bấm "Đăng nhập Google" trước.');
    }

    const sheetTitle =
      title || `Hóa Học 10 - THPT Chuyên Hùng Vương (Dữ liệu Học Sinh & Điểm Số)`;

    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: sheetTitle,
        },
        sheets: [
          { properties: { title: 'TaiKhoan_HocSinh', tabColor: { red: 0.1, green: 0.6, blue: 0.8 } } },
          { properties: { title: 'NhatKy_DangNhap', tabColor: { red: 0.2, green: 0.7, blue: 0.4 } } },
          { properties: { title: 'Diem_BaiTap', tabColor: { red: 0.9, green: 0.6, blue: 0.1 } } },
          { properties: { title: 'Diem_KiemTra', tabColor: { red: 0.6, green: 0.3, blue: 0.9 } } },
          // Dedicated hidden sheet for PINs:
          { properties: { title: '_BaoMat_MaPIN', hidden: true, tabColor: { red: 0.8, green: 0.1, blue: 0.2 } } },
        ],
      }),
    });

    if (!createRes.ok) {
      const errJson = await createRes.json().catch(() => ({}));
      throw new Error(
        `Không thể tạo bảng tính: ${errJson.error?.message || createRes.statusText}`
      );
    }

    const spreadsheetData = await createRes.json();
    const spreadsheetId = spreadsheetData.spreadsheetId;
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    // Initialize Headers for all sheets
    await this.initializeHeaders(spreadsheetId, token);

    const newConfig: GoogleSheetsConfig = {
      spreadsheetId,
      spreadsheetName: sheetTitle,
      spreadsheetUrl,
      connectedAt: new Date().toLocaleString('vi-VN'),
    };

    this.setConfig(newConfig);

    // Sync any existing local students to sheet
    const localStudents = this.getLocalRegisteredStudents();
    if (localStudents.length > 0) {
      for (const s of localStudents) {
        await this.appendStudentToSheet(spreadsheetId, token, s).catch(() => {});
      }
    }

    return newConfig;
  }

  // Initialize sheet headers
  private async initializeHeaders(spreadsheetId: string, token: string) {
    const headerData = [
      {
        range: 'TaiKhoan_HocSinh!A1:J1',
        values: [
          [
            'Thời gian đăng ký',
            'Lớp học',
            'Số thứ tự (STT)',
            'Họ và tên học sinh',
            'Lần đăng nhập gần nhất',
            'TN đúng cao nhất (Câu/15)',
            'Đ/S đúng cao nhất (Câu/4)',
            'TLN đúng cao nhất (Câu/3)',
            'Điểm KT cao nhất (Thang 10)',
            'Điểm thô KT cao nhất (Max 18)',
          ],
        ],
      },
      {
        range: '_BaoMat_MaPIN!A1:E1',
        values: [
          [
            'Lớp học',
            'Số thứ tự (STT)',
            'Họ và tên',
            'Mã PIN bảo mật (Bí mật)',
            'Thời gian cập nhật',
          ],
        ],
      },
      {
        range: 'NhatKy_DangNhap!A1:E1',
        values: [
          [
            'Thời gian đăng nhập',
            'Lớp học',
            'Số thứ tự (STT)',
            'Họ và tên',
            'Trạng thái',
          ],
        ],
      },
      {
        range: 'Diem_BaiTap!A1:I1',
        values: [
          [
            'Thời gian nộp bài',
            'Lớp học',
            'Số thứ tự (STT)',
            'Họ và tên',
            'Dạng bài tập',
            'Số câu đúng',
            'Tổng số câu',
            'Tỷ lệ đúng',
            'Điểm số (Thang 10)',
          ],
        ],
      },
      {
        range: 'Diem_KiemTra!A1:I1',
        values: [
          [
            'Thời gian nộp bài',
            'Lớp học',
            'Số thứ tự (STT)',
            'Họ và tên',
            'Điểm số (Thang 10)',
            'Điểm thô (Max 18)',
            'Trắc nghiệm (12 câu)',
            'Đúng / Sai (8 ý)',
            'Trả lời ngắn (4 câu)',
          ],
        ],
      },
    ];

    for (const item of headerData) {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
          item.range
        )}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: item.values }),
        }
      ).catch((err) => console.warn('Could not write header:', item.range, err));
    }
  }

  // Connect to an existing Google Spreadsheet by ID or Link
  public async connectExistingSpreadsheet(rawInput: string): Promise<GoogleSheetsConfig> {
    const spreadsheetId = this.parseSpreadsheetId(rawInput);
    if (!spreadsheetId) {
      throw new Error('Vui lòng nhập Link hoặc ID bảng tính hợp lệ.');
    }

    const token = await getAccessToken();
    if (!token) {
      throw new Error('Chưa có quyền xác thực Google. Vui lòng bấm "Đăng nhập Google" trước.');
    }

    // Verify access
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!checkRes.ok) {
      const err = await checkRes.json().catch(() => ({}));
      throw new Error(
        `Không thể truy cập Google Sheet (${spreadsheetId}): ${
          err.error?.message || 'Quyền truy cập bị từ chối hoặc file không tồn tại.'
        }`
      );
    }

    const metadata = await checkRes.json();
    const sheetName = metadata.properties?.title || 'Google Sheet liên kết';
    const sheetsList = metadata.sheets || [];
    const existingTitles = sheetsList.map((s: any) => s.properties?.title);

    // Required sheets
    const requiredSheets = ['TaiKhoan_HocSinh', 'NhatKy_DangNhap', 'Diem_BaiTap', 'Diem_KiemTra'];
    const missingSheets = requiredSheets.filter((s) => !existingTitles.includes(s));

    const batchRequests: any[] = [];

    // Add missing regular sheets
    for (const title of missingSheets) {
      batchRequests.push({ addSheet: { properties: { title } } });
    }

    // Ensure _BaoMat_MaPIN exists and is hidden
    const pinSheet = sheetsList.find((s: any) => s.properties?.title === '_BaoMat_MaPIN');
    if (!pinSheet) {
      batchRequests.push({
        addSheet: {
          properties: {
            title: '_BaoMat_MaPIN',
            hidden: true,
            tabColor: { red: 0.8, green: 0.1, blue: 0.2 },
          },
        },
      });
    } else if (!pinSheet.properties?.hidden) {
      // If it exists but not hidden, hide it!
      batchRequests.push({
        updateSheetProperties: {
          properties: {
            sheetId: pinSheet.properties?.sheetId,
            hidden: true,
          },
          fields: 'hidden',
        },
      });
    }

    if (batchRequests.length > 0) {
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests: batchRequests }),
      }).catch((e) => console.warn('BatchUpdate sheets warning:', e));
    }

    // Initialize missing headers
    await this.initializeHeaders(spreadsheetId, token);

    const config: GoogleSheetsConfig = {
      spreadsheetId,
      spreadsheetName: sheetName,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
      connectedAt: new Date().toLocaleString('vi-VN'),
    };

    this.setConfig(config);
    return config;
  }

  // Read Local Registered Students
  public getLocalRegisteredStudents(): RegisteredStudent[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_STUDENTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return DEFAULT_STUDENTS;
  }

  public saveLocalRegisteredStudents(students: RegisteredStudent[]) {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(students));
  }

  // Fetch all registered students from Google Sheet
  // CRITICAL: If an account is deleted from the Google Sheet, reloading or syncing removes it here.
  // The PINs are fetched securely from the hidden `_BaoMat_MaPIN` sheet so only the app accesses them!
  public async fetchRegisteredStudents(): Promise<RegisteredStudent[]> {
    const local = this.getLocalRegisteredStudents();
    const config = this.getConfig();
    const token = await getAccessToken();

    if (!config || !token) {
      return local;
    }

    try {
      // 1. Fetch public student list from TaiKhoan_HocSinh (A2:J)
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/TaiKhoan_HocSinh!A2:J`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        console.warn('Could not read registered students from Sheet, using local cache');
        return local;
      }

      const data = await res.json();
      const rows: string[][] = data.values || [];

      // 2. Fetch secret PINs from the hidden sheet _BaoMat_MaPIN (A2:E)
      const pinMap = new Map<string, string>();
      try {
        const pinRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/_BaoMat_MaPIN!A2:E`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (pinRes.ok) {
          const pinData = await pinRes.json();
          const pinRows: string[][] = pinData.values || [];
          pinRows.forEach((pr) => {
            const cls = (pr[0] || '').trim().toLowerCase();
            const stt = (pr[1] || '').trim();
            const pin = (pr[3] || '').trim();
            if (cls && stt) {
              pinMap.set(`${cls}_${stt}`, pin);
            }
          });
        }
      } catch (pinErr) {
        console.warn('Error reading hidden PIN sheet:', pinErr);
      }

      const parseNumber = (val?: string): number | undefined => {
        if (!val) return undefined;
        const m = val.toString().trim().match(/^(\d+(?:\.\d+)?)/);
        return m ? parseFloat(m[1]) : undefined;
      };

      const sheetStudents: RegisteredStudent[] = rows
        .map((r) => {
          const cls = (r[1] || '').trim();
          const stt = (r[2] || '').trim();
          const name = (r[3] || '').trim();
          const key = `${cls.toLowerCase()}_${stt}`;
          const localMatch = local.find(
            (l) => l.className.trim().toLowerCase() === cls.toLowerCase() && l.studentNo.trim() === stt
          );

          // Get PIN from the hidden sheet map, or from local fallback, default 1234
          const pin = pinMap.get(key) || localMatch?.pin || '1234';

          return {
            registeredAt: r[0] || '',
            className: cls,
            studentNo: stt,
            fullName: name,
            pin: pin,
            lastLoginAt: r[4] || '',
            maxMcCorrect: parseNumber(r[5]),
            maxTfCorrect: parseNumber(r[6]),
            maxSaCorrect: parseNumber(r[7]),
            maxTestScore10: parseNumber(r[8]),
            maxTestRawScore: parseNumber(r[9]),
          };
        })
        .filter((s) => s.fullName && s.className && s.studentNo);

      // Save sheet students as the single source of truth!
      this.saveLocalRegisteredStudents(sheetStudents);
      return sheetStudents;
    } catch (err) {
      console.warn('Fetch students error:', err);
      return local;
    }
  }

  // Delete a student account (both locally, from TaiKhoan_HocSinh, and from the hidden _BaoMat_MaPIN)
  public async deleteStudent(
    className: string,
    studentNo: string
  ): Promise<{ success: boolean; message: string }> {
    const normClass = className.trim().toLowerCase();
    const normSTT = studentNo.trim();

    // 1. Remove from local storage
    const currentList = this.getLocalRegisteredStudents();
    const updatedList = currentList.filter(
      (s) => !(s.className.trim().toLowerCase() === normClass && s.studentNo.trim() === normSTT)
    );
    this.saveLocalRegisteredStudents(updatedList);

    // 2. Remove from Google Sheet if connected
    const config = this.getConfig();
    const token = await getAccessToken();
    if (config && token) {
      try {
        // A. Remove from TaiKhoan_HocSinh
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/TaiKhoan_HocSinh!A2:J`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.ok) {
          const data = await res.json();
          const rows: string[][] = data.values || [];
          const filteredRows = rows.filter(
            (r) =>
              !(
                (r[1] || '').trim().toLowerCase() === normClass &&
                (r[2] || '').trim() === normSTT
              )
          );

          // Clear range A2:J
          await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/TaiKhoan_HocSinh!A2:J:clear`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            }
          );

          // Write remaining rows back
          if (filteredRows.length > 0) {
            await fetch(
              `https://sheets.googleapis.com/v4/spreadsheets/${
                config.spreadsheetId
              }/values/TaiKhoan_HocSinh!A2:J${filteredRows.length + 1}?valueInputOption=USER_ENTERED`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: filteredRows }),
              }
            );
          }
        }

        // B. Remove from the hidden _BaoMat_MaPIN sheet
        const pinRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/_BaoMat_MaPIN!A2:E`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (pinRes.ok) {
          const pinData = await pinRes.json();
          const pinRows: string[][] = pinData.values || [];
          const filteredPinRows = pinRows.filter(
            (r) =>
              !(
                (r[0] || '').trim().toLowerCase() === normClass &&
                (r[1] || '').trim() === normSTT
              )
          );

          // Clear range A2:E in _BaoMat_MaPIN
          await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/_BaoMat_MaPIN!A2:E:clear`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            }
          );

          // Write remaining rows back
          if (filteredPinRows.length > 0) {
            await fetch(
              `https://sheets.googleapis.com/v4/spreadsheets/${
                config.spreadsheetId
              }/values/_BaoMat_MaPIN!A2:E${filteredPinRows.length + 1}?valueInputOption=USER_ENTERED`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: filteredPinRows }),
              }
            );
          }
        }
      } catch (err) {
        console.warn('Failed to delete student from Sheet:', err);
      }
    }

    return {
      success: true,
      message: `Đã xóa tài khoản STT ${studentNo} - Lớp ${className} thành công!`,
    };
  }

  // Update a student's record high scores (Số câu đúng cao nhất & Điểm kiểm tra cao nhất)
  public async updateStudentMaxScores(params: {
    className: string;
    studentNo: string;
    mcCorrect?: number;
    tfCorrect?: number;
    saCorrect?: number;
    testScore10?: number;
    testRawScore?: number;
  }) {
    const normClass = params.className.trim().toLowerCase();
    const normSTT = params.studentNo.trim();

    const currentList = this.getLocalRegisteredStudents();
    const idx = currentList.findIndex(
      (s) => s.className.trim().toLowerCase() === normClass && s.studentNo.trim() === normSTT
    );
    if (idx === -1) return;

    const st = { ...currentList[idx] };

    if (params.mcCorrect !== undefined) {
      st.maxMcCorrect = Math.max(st.maxMcCorrect || 0, params.mcCorrect);
    }
    if (params.tfCorrect !== undefined) {
      st.maxTfCorrect = Math.max(st.maxTfCorrect || 0, params.tfCorrect);
    }
    if (params.saCorrect !== undefined) {
      st.maxSaCorrect = Math.max(st.maxSaCorrect || 0, params.saCorrect);
    }
    if (params.testScore10 !== undefined) {
      st.maxTestScore10 = Math.max(st.maxTestScore10 || 0, params.testScore10);
    }
    if (params.testRawScore !== undefined) {
      st.maxTestRawScore = Math.max(st.maxTestRawScore || 0, params.testRawScore);
    }

    currentList[idx] = st;
    this.saveLocalRegisteredStudents(currentList);

    // Sync row to Google Sheet in TaiKhoan_HocSinh
    const config = this.getConfig();
    const token = await getAccessToken();
    if (config && token) {
      try {
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/TaiKhoan_HocSinh!A2:J`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.ok) {
          const data = await res.json();
          const rows: string[][] = data.values || [];
          const sheetRowIdx = rows.findIndex(
            (r) =>
              (r[1] || '').trim().toLowerCase() === normClass &&
              (r[2] || '').trim() === normSTT
          );

          if (sheetRowIdx !== -1) {
            const rowNum = sheetRowIdx + 2;
            const existingRow = rows[sheetRowIdx];
            const updatedRow = [
              existingRow[0] || st.registeredAt,
              existingRow[1] || st.className,
              existingRow[2] || st.studentNo,
              existingRow[3] || st.fullName,
              existingRow[4] || st.lastLoginAt || '',
              st.maxMcCorrect !== undefined ? `${st.maxMcCorrect}/15` : (existingRow[5] || ''),
              st.maxTfCorrect !== undefined ? `${st.maxTfCorrect}/4` : (existingRow[6] || ''),
              st.maxSaCorrect !== undefined ? `${st.maxSaCorrect}/3` : (existingRow[7] || ''),
              st.maxTestScore10 !== undefined ? st.maxTestScore10 : (existingRow[8] || ''),
              st.maxTestRawScore !== undefined ? `${st.maxTestRawScore}/18` : (existingRow[9] || ''),
            ];

            await fetch(
              `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/TaiKhoan_HocSinh!A${rowNum}:J${rowNum}?valueInputOption=USER_ENTERED`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: [updatedRow] }),
              }
            );
          }
        }
      } catch (err) {
        console.warn('Update max scores in Sheet warning:', err);
      }
    }
  }

  // Validation: Check for duplicates in the same class
  public checkDuplicate(
    currentList: RegisteredStudent[],
    candidate: { className: string; studentNo: string; fullName: string }
  ): { isDuplicate: boolean; reason?: string } {
    const candidateClass = candidate.className.trim().toLowerCase();
    const candidateSTT = parseInt(candidate.studentNo.trim(), 10);
    const candidateName = candidate.fullName.trim().toLowerCase();

    const sameClass = currentList.filter(
      (s) => s.className.trim().toLowerCase() === candidateClass
    );

    // 1. Trùng Số thứ tự trong cùng lớp
    const matchSTT = sameClass.find(
      (s) => parseInt(s.studentNo.trim(), 10) === candidateSTT
    );
    if (matchSTT) {
      return {
        isDuplicate: true,
        reason: `Số thứ tự ${candidate.studentNo} của lớp ${candidate.className} đã được học sinh "${matchSTT.fullName}" đăng ký! Mỗi bạn trong lớp chỉ được có một số thứ tự riêng.`,
      };
    }

    // 2. Trùng Họ và Tên trong cùng lớp
    const matchName = sameClass.find(
      (s) => s.fullName.trim().toLowerCase() === candidateName
    );
    if (matchName) {
      return {
        isDuplicate: true,
        reason: `Họ và tên "${candidate.fullName}" đã được đăng ký trong lớp ${candidate.className} với STT ${matchName.studentNo}! Nếu đây là tài khoản của bạn, vui lòng chuyển sang mục "Đăng nhập".`,
      };
    }

    return { isDuplicate: false };
  }

  // Register a new student
  public async registerStudent(newStudent: {
    fullName: string;
    className: string;
    studentNo: string;
    pin: string;
  }): Promise<{ success: boolean; message: string; student?: RegisteredStudent }> {
    // Refresh latest student list from sheet or local
    const currentList = await this.fetchRegisteredStudents();

    // Check duplicate
    const check = this.checkDuplicate(currentList, newStudent);
    if (check.isDuplicate) {
      return { success: false, message: check.reason || 'Trùng lặp thông tin đăng ký!' };
    }

    const registered: RegisteredStudent = {
      fullName: newStudent.fullName.trim(),
      className: newStudent.className.trim(),
      studentNo: newStudent.studentNo.trim(),
      pin: newStudent.pin.trim() || '1234',
      registeredAt: new Date().toLocaleString('vi-VN'),
    };

    // Update local cache immediately
    const updated = [...currentList, registered];
    this.saveLocalRegisteredStudents(updated);

    // Sync to Google Sheet if connected
    const config = this.getConfig();
    const token = await getAccessToken();
    if (config && token) {
      try {
        await this.appendStudentToSheet(config.spreadsheetId, token, registered);
      } catch (e) {
        console.warn('Failed to append to Google Sheet in background:', e);
      }
    }

    return {
      success: true,
      message: `Đăng ký thành công học sinh ${registered.fullName} - Lớp ${registered.className} (STT ${registered.studentNo})!`,
      student: registered,
    };
  }

  // Appends student to both public TaiKhoan_HocSinh (without PIN) and hidden _BaoMat_MaPIN (with PIN)
  private async appendStudentToSheet(
    spreadsheetId: string,
    token: string,
    student: RegisteredStudent
  ) {
    // 1. Append to TaiKhoan_HocSinh (A:J) - NO PIN
    const publicRow = [
      student.registeredAt,
      student.className,
      student.studentNo,
      student.fullName,
      student.lastLoginAt || '',
      student.maxMcCorrect !== undefined ? `${student.maxMcCorrect}/15` : '',
      student.maxTfCorrect !== undefined ? `${student.maxTfCorrect}/4` : '',
      student.maxSaCorrect !== undefined ? `${student.maxSaCorrect}/3` : '',
      student.maxTestScore10 !== undefined ? student.maxTestScore10 : '',
      student.maxTestRawScore !== undefined ? `${student.maxTestRawScore}/18` : '',
    ];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/TaiKhoan_HocSinh!A:J:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [publicRow] }),
      }
    ).catch((e) => console.warn('Append to TaiKhoan_HocSinh warning:', e));

    // 2. Append to hidden _BaoMat_MaPIN (A:E) - ONLY PIN
    const secretRow = [
      student.className,
      student.studentNo,
      student.fullName,
      student.pin || '1234',
      student.registeredAt || new Date().toLocaleString('vi-VN'),
    ];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/_BaoMat_MaPIN!A:E:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [secretRow] }),
      }
    ).catch((e) => console.warn('Append to _BaoMat_MaPIN warning:', e));
  }

  // Verify and execute student login
  public async loginStudent(credentials: {
    className: string;
    studentNo: string;
    pin?: string;
  }): Promise<{ success: boolean; message: string; profile?: StudentProfile }> {
    const currentList = await this.fetchRegisteredStudents();
    const candClass = credentials.className.trim().toLowerCase();
    const candSTT = parseInt(credentials.studentNo.trim(), 10);

    // Look for registration
    const match = currentList.find(
      (s) =>
        s.className.trim().toLowerCase() === candClass &&
        parseInt(s.studentNo.trim(), 10) === candSTT
    );

    if (!match) {
      return {
        success: false,
        message: `Chưa tìm thấy thông tin đăng ký cho STT ${credentials.studentNo} trong lớp ${credentials.className}! Bạn phải "ĐĂNG KÝ TÀI KHOẢN" trước khi đăng nhập.`,
      };
    }

    // Verify PIN
    // If student has a PIN set, ensure entered PIN matches
    const expectedPin = (match.pin || '1234').trim();
    const inputPin = (credentials.pin || '').trim();

    if (inputPin && expectedPin && inputPin !== expectedPin) {
      return {
        success: false,
        message: 'Mã PIN / Mật khẩu không chính xác! Vui lòng thử lại.',
      };
    }

    const nowStr = new Date().toLocaleTimeString('vi-VN');
    const profile: StudentProfile = {
      fullName: match.fullName,
      className: match.className,
      studentNo: match.studentNo,
      loginTime: nowStr,
    };

    // Update lastLoginAt
    match.lastLoginAt = new Date().toLocaleString('vi-VN');
    this.saveLocalRegisteredStudents(currentList);

    // Record login into sheet in background
    this.recordLogin(profile).catch(() => {});

    return {
      success: true,
      message: `Đăng nhập thành công! Chào mừng ${match.fullName}.`,
      profile,
    };
  }

  // Record login event
  public async recordLogin(profile: StudentProfile) {
    const config = this.getConfig();
    const token = await getAccessToken();
    if (!config || !token) return;

    try {
      const row = [
        new Date().toLocaleString('vi-VN'),
        profile.className,
        profile.studentNo,
        profile.fullName,
        'Thành công (Online Lab)',
      ];

      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/NhatKy_DangNhap!A:E:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: [row] }),
        }
      );
    } catch (e) {
      console.warn('Record login warning:', e);
    }
  }

  // Record Exercise Score (Trắc nghiệm, Đúng/Sai, Trả lời ngắn)
  public async recordExerciseScore(record: ExerciseScoreRecord): Promise<boolean> {
    // Cache locally
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXERCISE_SCORES);
      const list = saved ? JSON.parse(saved) : [];
      list.push(record);
      localStorage.setItem(STORAGE_KEYS.EXERCISE_SCORES, JSON.stringify(list));
    } catch {}

    // Update highest scores in TaiKhoan_HocSinh
    if (record.exerciseType === 'Trắc nghiệm') {
      this.updateStudentMaxScores({
        className: record.className,
        studentNo: record.studentNo,
        mcCorrect: record.correctCount,
      }).catch(() => {});
    } else if (record.exerciseType === 'Đúng / Sai') {
      this.updateStudentMaxScores({
        className: record.className,
        studentNo: record.studentNo,
        tfCorrect: record.correctCount,
      }).catch(() => {});
    } else if (record.exerciseType === 'Trả lời ngắn') {
      this.updateStudentMaxScores({
        className: record.className,
        studentNo: record.studentNo,
        saCorrect: record.correctCount,
      }).catch(() => {});
    }

    const config = this.getConfig();
    const token = await getAccessToken();
    if (!config || !token) return false;

    try {
      const row = [
        record.timestamp,
        record.className,
        record.studentNo,
        record.fullName,
        record.exerciseType,
        record.correctCount,
        record.totalQuestions,
        `${record.percentage}%`,
        record.score10,
      ];

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/Diem_BaiTap!A:I:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: [row] }),
        }
      );
      return res.ok;
    } catch (e) {
      console.warn('Record exercise score warning:', e);
      return false;
    }
  }

  // Record Mini Test Score
  public async recordMiniTestScore(record: MiniTestScoreRecord): Promise<boolean> {
    // Cache locally
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_SCORES);
      const list = saved ? JSON.parse(saved) : [];
      list.push(record);
      localStorage.setItem(STORAGE_KEYS.TEST_SCORES, JSON.stringify(list));
    } catch {}

    // Update highest scores in TaiKhoan_HocSinh
    this.updateStudentMaxScores({
      className: record.className,
      studentNo: record.studentNo,
      testScore10: record.score10,
      testRawScore: record.rawScore,
      mcCorrect: record.mcCorrect,
      saCorrect: record.saCorrect,
    }).catch(() => {});

    const config = this.getConfig();
    const token = await getAccessToken();
    if (!config || !token) return false;

    try {
      const row = [
        record.timestamp,
        record.className,
        record.studentNo,
        record.fullName,
        record.score10,
        `${record.rawScore}/18`,
        `${record.mcCorrect}/12`,
        `${record.tfStatementsCorrect}/8`,
        `${record.saCorrect}/4`,
      ];

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/Diem_KiemTra!A:I:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: [row] }),
        }
      );
      return res.ok;
    } catch (e) {
      console.warn('Record mini test score warning:', e);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
