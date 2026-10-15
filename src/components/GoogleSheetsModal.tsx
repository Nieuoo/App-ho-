import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  ExternalLink,
  PlusCircle,
  Link2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  Users,
  Award,
  LogIn,
  LogOut,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { googleSheetsService } from '../services/googleSheetsService';
import {
  googleSignIn,
  googleLogout,
  getAccessToken,
  initAuth,
} from '../services/googleAuth';
import { GoogleSheetsConfig, RegisteredStudent } from '../types/chemistry';
import { soundFX } from '../utils/soundEffects';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged?: (config: GoogleSheetsConfig | null) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onConfigChanged,
}) => {
  const [config, setConfig] = useState<GoogleSheetsConfig | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudent[]>([]);
  const [activeTab, setActiveTab] = useState<'status' | 'students' | 'connect'>('status');

  // Class filtering state
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');

  const refreshData = async () => {
    const currentConfig = googleSheetsService.getConfig();
    setConfig(currentConfig);

    const token = await getAccessToken();
    setHasToken(!!token);

    const students = await googleSheetsService.fetchRegisteredStudents();
    setRegisteredStudents(students);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => {
        setHasToken(true);
        refreshData();
      },
      () => {
        setHasToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Group registered students by class
  const studentsByClass = useMemo(() => {
    const map = new Map<string, RegisteredStudent[]>();
    registeredStudents.forEach((st) => {
      const cls = st.className;
      if (!map.has(cls)) {
        map.set(cls, []);
      }
      map.get(cls)!.push(st);
    });
    map.forEach((list) => {
      list.sort((a, b) => parseInt(a.studentNo, 10) - parseInt(b.studentNo, 10));
    });
    return map;
  }, [registeredStudents]);

  const registeredClasses = useMemo(() => {
    return Array.from(studentsByClass.keys()).sort();
  }, [studentsByClass]);

  const displayedStudents = useMemo(() => {
    if (selectedClassFilter === 'ALL') {
      return registeredStudents;
    }
    return registeredStudents.filter((s) => s.className === selectedClassFilter);
  }, [registeredStudents, selectedClassFilter]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMsg(null);
    soundFX.playClick();
    try {
      const res = await googleSignIn();
      if (res.accessToken) {
        setHasToken(true);
        setStatusMsg({
          type: 'success',
          text: `Đã đăng nhập Google thành công (${res.user.email || res.user.displayName}).`,
        });

        // If no sheet connected yet, auto create or load
        const curConfig = googleSheetsService.getConfig();
        if (!curConfig) {
          try {
            const newConfig = await googleSheetsService.createNewSpreadsheet();
            setConfig(newConfig);
            if (onConfigChanged) onConfigChanged(newConfig);
            setStatusMsg({
              type: 'success',
              text: 'Đã tự động khởi tạo Google Sheet mới trên Google Drive của bạn!',
            });
          } catch (createErr: any) {
            console.warn('Auto create sheet notice:', createErr);
          }
        }
        await refreshData();
      }
    } catch (e: any) {
      setStatusMsg({
        type: 'error',
        text: `Đăng nhập Google thất bại: ${e.message || 'Vui lòng thử lại.'}`,
      });
      soundFX.playWrong();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogout = async () => {
    soundFX.playClick();
    await googleLogout();
    setHasToken(false);
    setStatusMsg({ type: 'success', text: 'Đã ngắt kết nối tài khoản Google.' });
  };

  const handleCreateNewSheet = async () => {
    setIsLoading(true);
    setStatusMsg(null);
    soundFX.playClick();
    try {
      const newConfig = await googleSheetsService.createNewSpreadsheet();
      setConfig(newConfig);
      if (onConfigChanged) onConfigChanged(newConfig);
      setStatusMsg({
        type: 'success',
        text: `Đã tạo thành công bảng tính mới: "${newConfig.spreadsheetName}"!`,
      });
      soundFX.playFanfare();
      await refreshData();
    } catch (e: any) {
      setStatusMsg({
        type: 'error',
        text: e.message || 'Không thể tạo bảng tính. Vui lòng kiểm tra quyền Google.',
      });
      soundFX.playWrong();
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg(null);
    soundFX.playClick();
    try {
      const connectedConfig = await googleSheetsService.connectExistingSpreadsheet(inputUrl);
      setConfig(connectedConfig);
      if (onConfigChanged) onConfigChanged(connectedConfig);
      setStatusMsg({
        type: 'success',
        text: `Đã kết nối thành công với bảng tính: "${connectedConfig.spreadsheetName}"!`,
      });
      soundFX.playCorrect();
      setInputUrl('');
      await refreshData();
    } catch (e: any) {
      setStatusMsg({
        type: 'error',
        text: e.message || 'Không thể kết nối với Sheet. Vui lòng kiểm tra link hoặc quyền chia sẻ.',
      });
      soundFX.playWrong();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 z-10 text-white overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Liên kết Trang tính Google Sheets
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  REAL-TIME SYNC
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Lưu trữ tài khoản, số câu đúng cao nhất & điểm kiểm tra cao nhất
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="px-5 pt-3 border-b border-slate-800 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Trạng thái kết nối
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'students'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Danh sách theo lớp & Điểm cao nhất ({registeredStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'connect'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            Cấu hình & Tạo bảng tính
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Status Message */}
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </motion.div>
          )}

          {/* TAB 1: STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Google Auth Status Box */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hasToken ? 'bg-emerald-400 shadow-md shadow-emerald-400/50' : 'bg-amber-400'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {hasToken ? 'Tài khoản Google đã kết nối' : 'Chưa xác thực Google'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {hasToken
                        ? 'Đã sẵn sàng ghi dữ liệu trực tiếp vào Google Drive & Google Sheets'
                        : 'Bấm nút bên dưới để cấp quyền lưu trữ tự động vào Google Sheets'}
                    </span>
                  </div>
                </div>

                {!hasToken ? (
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                    <span>{isLoading ? 'Đang kết nối...' : 'Đăng nhập Google'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleLogout}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Đăng xuất
                  </button>
                )}
              </div>

              {/* Spreadsheet Details Card */}
              {config ? (
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase font-mono text-emerald-400 font-bold tracking-wider">
                        Bảng tính hiện tại
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {config.spreadsheetName}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        ID: {config.spreadsheetId}
                      </p>
                    </div>

                    <a
                      href={config.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <span>Mở Google Sheet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Tabs breakdown preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Tab 1: Học sinh & Điểm</span>
                      <span className="text-xs font-bold text-cyan-300 font-mono">TaiKhoan_HocSinh</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Tab 2: Đăng nhập</span>
                      <span className="text-xs font-bold text-emerald-300 font-mono">NhatKy_DangNhap</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Tab 3: Bài tập</span>
                      <span className="text-xs font-bold text-amber-300 font-mono">Diem_BaiTap</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Tab 4: Kiểm tra</span>
                      <span className="text-xs font-bold text-purple-300 font-mono">Diem_KiemTra</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">
                      Mã PIN bảo mật được lưu trong tab riêng <strong className="text-rose-400 font-mono">_BaoMat_MaPIN</strong> và được cài đặt ẩn (<em className="text-emerald-300">hidden: true</em>) để bảo mật tuyệt đối.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-500/30 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Chưa liên kết Bảng tính Google Sheet</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      Bạn có thể bấm &quot;Tự động tạo Sheet mới&quot; hoặc nhập link bảng tính sẵn có để đồng bộ tài khoản và kết quả làm bài của học sinh.
                    </p>
                  </div>

                  {hasToken && (
                    <button
                      onClick={handleCreateNewSheet}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{isLoading ? 'Đang khởi tạo...' : 'Tạo Sheet tự động ngay'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Dynamic Sheet Sync Guarantee */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300 block">
                    Bảo mật và đồng bộ thời gian thực:
                  </span>
                  <span className="text-slate-300 leading-relaxed block mt-0.5">
                    Hệ thống tự động lưu số câu đúng cao nhất và điểm cao nhất bài kiểm tra vào Google Sheet. Đồng thời, học sinh chỉ có thể xóa tài khoản của chính mình sau khi đã đăng nhập. Khi xóa tài khoản trên Google Sheet thì tải lại trang tài khoản đó sẽ tự động bị xóa trong ứng dụng.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTERED STUDENTS LIST (CHIA THEO LỚP) */}
          {activeTab === 'students' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  Tổng số tài khoản: <strong className="text-cyan-300">{registeredStudents.length}</strong> • Điểm cao nhất được lưu trên Google Sheet.
                </span>
                <button
                  onClick={refreshData}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  Làm mới từ Sheet
                </button>
              </div>

              {/* Class Filter Chips */}
              <div className="flex flex-wrap gap-1.5 items-center pt-1">
                <span className="text-[11px] text-slate-400 mr-1">Lọc lớp:</span>
                <button
                  type="button"
                  onClick={() => setSelectedClassFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedClassFilter === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Tất cả ({registeredStudents.length})
                </button>
                {registeredClasses.map((cls) => {
                  const count = studentsByClass.get(cls)?.length || 0;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClassFilter(cls)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedClassFilter === cls
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {cls} ({count})
                    </button>
                  );
                })}
              </div>

              {displayedStudents.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800">
                  Chưa có tài khoản nào được đăng ký trong danh mục này.
                </div>
              ) : (
                <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-950/60">
                  <table className="w-full text-xs text-left min-w-[650px]">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Lớp</th>
                        <th className="py-2.5 px-3">STT</th>
                        <th className="py-2.5 px-3">Họ và tên</th>
                        <th className="py-2.5 px-3">TN cao nhất</th>
                        <th className="py-2.5 px-3">Đ/S cao nhất</th>
                        <th className="py-2.5 px-3">TLN cao nhất</th>
                        <th className="py-2.5 px-3">Điểm KT cao nhất</th>
                        <th className="py-2.5 px-3">Lần đăng nhập cuối</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {displayedStudents.map((st, i) => (
                        <tr key={i} className="hover:bg-cyan-950/20 transition-colors">
                          <td className="py-2 px-3 text-cyan-300 font-bold">{st.className}</td>
                          <td className="py-2 px-3 font-mono text-amber-300">{st.studentNo}</td>
                          <td className="py-2 px-3 text-white font-semibold">{st.fullName}</td>
                          <td className="py-2 px-3 font-mono text-sky-300">
                            {st.maxMcCorrect !== undefined ? `${st.maxMcCorrect}/15` : '-'}
                          </td>
                          <td className="py-2 px-3 font-mono text-emerald-300">
                            {st.maxTfCorrect !== undefined ? `${st.maxTfCorrect}/4` : '-'}
                          </td>
                          <td className="py-2 px-3 font-mono text-amber-300">
                            {st.maxSaCorrect !== undefined ? `${st.maxSaCorrect}/3` : '-'}
                          </td>
                          <td className="py-2 px-3 font-mono text-purple-300 font-bold">
                            {st.maxTestScore10 !== undefined ? (
                              <span className="inline-flex items-center gap-1">
                                <Trophy className="w-3 h-3 text-amber-400" />
                                {st.maxTestScore10} đ ({st.maxTestRawScore || 0}/18)
                              </span>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">
                            {st.lastLoginAt || 'Chưa đăng nhập'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONNECT & CONFIG */}
          {activeTab === 'connect' && (
            <div className="space-y-4">
              {/* Option A: Auto Create */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  Cách 1: Tự động tạo bảng tính chuẩn trên Google Drive
                </h4>
                <p className="text-xs text-slate-400">
                  Hệ thống sẽ tạo 1 file Google Sheets mới với đầy đủ 4 tab dữ liệu công khai và 1 tab mã PIN ẩn riêng biệt.
                </p>
                <button
                  onClick={handleCreateNewSheet}
                  disabled={isLoading || !hasToken}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isLoading ? 'Đang tạo...' : 'Tạo Bảng Tính Mới'}</span>
                </button>
                {!hasToken && (
                  <span className="text-[11px] text-amber-400 block">
                    * Cần bấm &quot;Đăng nhập Google&quot; ở tab Trạng thái trước khi tạo.
                  </span>
                )}
              </div>

              {/* Option B: Connect Existing */}
              <form
                onSubmit={handleConnectExisting}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-cyan-400" />
                  Cách 2: Nhập Link hoặc ID bảng tính Google Sheets có sẵn
                </h4>
                <p className="text-xs text-slate-400">
                  Dán đường link (URL) hoặc mã ID của file Google Sheet bạn muốn đồng bộ dữ liệu vào đây.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0.../edit"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputUrl.trim() || !hasToken}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Liên kết</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Đồng bộ tự động theo Google Sheets khi học sinh làm bài hoặc xóa tài khoản
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
};
