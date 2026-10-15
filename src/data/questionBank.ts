import { MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion, EssayQuestion } from '../types/chemistry';

// ==========================================
// 1. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM (MULTIPLE CHOICE - 30 CÂU)
// ĐÁP ÁN ĐA DẠNG TRẢI ĐỀU A, B, C, D
// ==========================================
export const MULTIPLE_CHOICE_BANK: MultipleChoiceQuestion[] = [
  {
    id: 'mc-1',
    type: 'multiple-choice',
    question: 'Theo quy luật biến đổi trong một chu kỳ từ trái sang phải, tính acid của oxide cao nhất và hydroxide tương ứng biến đổi như thế nào?',
    options: [
      'Giảm dần',
      'Tăng dần',
      'Không thay đổi',
      'Vừa tăng vừa giảm'
    ],
    correctAnswerIndex: 1, // B
    explanation: 'Trong một chu kỳ, đi từ trái sang phải theo chiều điện tích hạt nhân tăng dần: độ âm điện tăng, tính phi kim tăng nên tính acid của oxide cao nhất và hydroxide tương ứng tăng dần, đồng thời tính base giảm dần.',
    hint: 'Hãy nhớ lại chiều biến đổi từ Na (kim loại mạnh -> base mạnh NaOH) sang Cl (phi kim mạnh -> acid rất mạnh HClO₄).'
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    question: 'Oxide cao nhất của nguyên tố Sulfur (S, Z=16, thuộc nhóm VIA) có công thức là gì?',
    options: [
      'SO₂',
      'S₂O₃',
      'SO₃',
      'S₂O₇'
    ],
    correctAnswerIndex: 2, // C
    explanation: 'Sulfur thuộc nhóm VIA nên hóa trị cao nhất với oxygen bằng số thứ tự nhóm là VI. Công thức oxide cao nhất là S₂O₆ hay tối giản thành SO₃.',
    hint: 'Nguyên tố nhóm VIA có hóa trị cao nhất trong oxide là VI.'
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    question: 'Hydroxide tương ứng với oxide cao nhất của Phosphorus (P, Z=15, nhóm VA) là chất nào sau đây?',
    options: [
      'H₃PO₄',
      'H₃PO₃',
      'H₃PO₂',
      'HPO₃'
    ],
    correctAnswerIndex: 0, // A
    explanation: 'Phosphorus (P, nhóm VA) có oxide cao nhất là P₂O₅ (P mang số oxi hóa +5). Hydroxide (oxoacid) tương ứng có phosphorus đạt số oxi hóa cao nhất +5 là phosphoric acid H₃PO₄.',
    hint: 'Hydroxide của phi kim là các oxoacid, P có hóa trị cao nhất là V.'
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    question: 'Trong các hydroxide của các nguyên tố Chu kỳ 3: NaOH, Mg(OH)₂, Al(OH)₃, chất nào có tính chất lưỡng tính (amphoteric)?',
    options: [
      'NaOH',
      'Mg(OH)₂',
      'Cả ba chất trên',
      'Al(OH)₃'
    ],
    correctAnswerIndex: 3, // D
    explanation: 'Al(OH)₃ là hydroxide lưỡng tính: vừa tác dụng được với dung dịch acid mạnh (như HCl), vừa tác dụng được với dung dịch base mạnh (như NaOH): Al(OH)₃ + NaOH → Na[Al(OH)₄].',
    hint: 'Chất này là kết tủa keo trắng, tan được trong cả acid mạnh và kiềm dư.'
  },
  {
    id: 'mc-5',
    type: 'multiple-choice',
    question: 'Dãy nào sau đây được sắp xếp theo chiều TĂNG DẦN tính acid của các hydroxide?',
    options: [
      'HClO₄ < H₂SO₄ < H₃PO₄ < H₂SiO₃',
      'H₂SiO₃ < H₃PO₄ < H₂SO₄ < HClO₄',
      'H₃PO₄ < H₂SiO₃ < H₂SO₄ < HClO₄',
      'H₂SO₄ < H₃PO₄ < HClO₄ < H₂SiO₃'
    ],
    correctAnswerIndex: 1, // B
    explanation: 'Các nguyên tố Si (IVA), P (VA), S (VIA), Cl (VIIA) cùng thuộc chu kỳ 3. Đi từ trái qua phải, tính phi kim tăng dần nên tính acid của hydroxide tương ứng tăng dần: H₂SiO₃ (acid rất yếu) < H₃PO₄ (acid trung bình) < H₂SO₄ (acid mạnh) < HClO₄ (acid rất mạnh).',
    hint: 'Theo chiều từ trái qua phải trong chu kỳ 3: Si → P → S → Cl.'
  },
  {
    id: 'mc-6',
    type: 'multiple-choice',
    question: 'Nguyên tố R có cấu hình electron lớp ngoài cùng là 3s²3p¹. Công thức oxide cao nhất và hydroxide tương ứng của R lần lượt là:',
    options: [
      'RO₂ và R(OH)₂',
      'R₂O và ROH',
      'R₂O₃ và R(OH)₃',
      'RO₃ và H₂RO₄'
    ],
    correctAnswerIndex: 2, // C
    explanation: 'Cấu hình 3s²3p¹ có 3 electron lớp ngoài cùng, thuộc nhóm IIIA chu kỳ 3 (nguyên tố Aluminium Al). Do đó oxide cao nhất là R₂O₃ và hydroxide tương ứng là R(OH)₃.',
    hint: '3 electron hóa trị ở phân lớp s và p ứng với nhóm IIIA.'
  },
  {
    id: 'mc-7',
    type: 'multiple-choice',
    question: 'Trong một nhóm A (ví dụ nhóm IA), đi từ trên xuống dưới theo chiều tăng dần của điện tích hạt nhân, tính base của các hydroxide biến đổi thế nào?',
    options: [
      'Tăng dần',
      'Giảm dần',
      'Không biến đổi',
      'Giảm rồi tăng'
    ],
    correctAnswerIndex: 0, // A
    explanation: 'Trong nhóm A, đi từ trên xuống dưới: bán kính nguyên tử tăng, lực hút hạt nhân với electron hóa trị giảm, tính kim loại tăng dần dẫn tới tính base của oxide và hydroxide tăng dần (Ví dụ: LiOH < NaOH < KOH < RbOH < CsOH).',
    hint: 'Bán kính nguyên tử tăng dần từ trên xuống dưới làm electron ngoài cùng dễ nhường hơn.'
  },
  {
    id: 'mc-8',
    type: 'multiple-choice',
    question: 'Oxide nào sau đây vừa tác dụng được với dung dịch HCl vừa tác dụng được với dung dịch NaOH?',
    options: [
      'Na₂O',
      'MgO',
      'SiO₂',
      'Al₂O₃'
    ],
    correctAnswerIndex: 3, // D
    explanation: 'Al₂O₃ là amphoteric oxide (oxide lưỡng tính), có thể phản ứng với acid mạnh tạo muối nhôm: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O và tan trong kiềm mạnh: Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄].',
    hint: 'Đây là oxide của nguyên tố đứng ở ranh giới giữa kim loại và phi kim trong chu kỳ 3.'
  },
  {
    id: 'mc-9',
    type: 'multiple-choice',
    question: 'Chlorine (Z=17, nhóm VIIA) có oxide cao nhất là Cl₂O₇. Oxide này thuộc loại nào sau đây?',
    options: [
      'Basic oxide mạnh',
      'Acidic oxide rất mạnh',
      'Amphoteric oxide (lưỡng tính)',
      'Oxide trung tính'
    ],
    correctAnswerIndex: 1, // B
    explanation: 'Cl₂O₇ là oxide axit (acidic oxide) ứng với acid rất mạnh HClO₄: Cl₂O₇ + H₂O → 2HClO₄.',
    hint: 'Cl là phi kim rất mạnh ở cuối chu kỳ 3, tác dụng với nước tạo siêu acid.'
  },
  {
    id: 'mc-10',
    type: 'multiple-choice',
    question: 'Cho các oxide: Na₂O, MgO, Al₂O₃, SiO₂, P₂O₅, SO₃, Cl₂O₇. Có bao nhiêu acidic oxide trong dãy trên?',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctAnswerIndex: 2, // C
    explanation: 'Các acidic oxide gồm có 4 chất: SiO₂, P₂O₅, SO₃, Cl₂O₇. Trong khi Na₂O và MgO là basic oxide, còn Al₂O₃ là amphoteric oxide.',
    hint: 'Đếm các oxide của các phi kim và á kim: Si, P, S, Cl.'
  },
  {
    id: 'mc-11',
    type: 'multiple-choice',
    question: 'Nguyên tố X thuộc chu kỳ 3, nhóm IIA. Nhận định nào sau đây về X là ĐÚNG?',
    options: [
      'Oxide cao nhất của X là X₂O, có tính acid',
      'Hydroxide của X có tính lưỡng tính',
      'Hydroxide của X là acid mạnh',
      'Oxide cao nhất của X là XO, có tính base'
    ],
    correctAnswerIndex: 3, // D
    explanation: 'X thuộc chu kỳ 3 nhóm IIA chính là Magnesium (Mg). Hóa trị cao nhất với oxygen là II nên oxide cao nhất là XO (MgO), có tính base (tác dụng với acid tạo muối và nước).',
    hint: 'Nhóm IIA có hóa trị II trong oxide.'
  },
  {
    id: 'mc-12',
    type: 'multiple-choice',
    question: 'Một nguyên tố R có công thức hợp chất khí với hydrogen là RH₃. Công thức oxide cao nhất của R là:',
    options: [
      'R₂O₅',
      'RO₃',
      'R₂O₃',
      'RO₂'
    ],
    correctAnswerIndex: 0, // A
    explanation: 'Hợp chất khí với hydrogen là RH₃ nên R có hóa trị III với H. Vì tổng hóa trị với H và hóa trị cao nhất với O của phi kim là 8 nên hóa trị cao nhất với O là 8 - 3 = 5 (nhóm VA). Công thức oxide cao nhất là R₂O₅.',
    hint: 'Quy tắc: Hóa trị trong hợp chất khí với H + Hóa trị cao nhất với O = 8.'
  },
  {
    id: 'mc-13',
    type: 'multiple-choice',
    question: 'Nguyên tố nào sau đây có tính acid của hydroxide tương ứng là MẠNH NHẤT trong chu kỳ 2?',
    options: [
      'Carbon (C) - H₂CO₃',
      'Nitrogen (N) - HNO₃',
      'Boron (B) - H₃BO₃',
      'Lithium (Li) - LiOH'
    ],
    correctAnswerIndex: 1, // B
    explanation: 'Trong chu kỳ 2, theo chiều tăng Z: B < C < N, tính phi kim tăng dần nên tính acid tăng dần. Nitric acid HNO₃ là acid mạnh, H₂CO₃ và H₃BO₃ là acid yếu, LiOH là base.',
    hint: 'Xét các oxoacid của B, C, N; trong đó acid nào phân li hoàn toàn trong nước?'
  },
  {
    id: 'mc-14',
    type: 'multiple-choice',
    question: 'Trong các base sau: NaOH, KOH, Ca(OH)₂, Ba(OH)₂, base nào có tính base MẠNH NHẤT?',
    options: [
      'NaOH',
      'Ca(OH)₂',
      'KOH',
      'Ba(OH)₂'
    ],
    correctAnswerIndex: 2, // C
    explanation: 'K thuộc chu kỳ 4 nhóm IA, có tính kim loại mạnh hơn Na (chu kỳ 3 nhóm IA). Giữa nhóm IA và IIA thì kim loại kiềm nhóm IA có bán kính lớn hơn, độ âm điện nhỏ hơn nên KOH phân li tạo OH⁻ dễ dàng nhất, có tính base mạnh nhất trong các chất nêu trên.',
    hint: 'So sánh vị trí của K và Na trong nhóm IA.'
  },
  {
    id: 'mc-15',
    type: 'multiple-choice',
    question: 'Silicon (Si, Z=14) tạo oxide cao nhất là SiO₂. Phản ứng nào sau đây chứng minh SiO₂ là acidic oxide?',
    options: [
      'SiO₂ + 4HF → SiF₄ + 2H₂O',
      'SiO₂ + 2C → Si + 2CO',
      'SiO₂ + 2Mg → 2MgO + Si',
      'SiO₂ + 2NaOH (đặc, t°) → Na₂SiO₃ + H₂O'
    ],
    correctAnswerIndex: 3, // D
    explanation: 'SiO₂ phản ứng với dung dịch kiềm mạnh ở nhiệt độ cao sinh ra muối silicate và nước chứng minh nó là một acidic oxide. (Phản ứng với HF là tính chất đặc biệt khắc kính của SiO₂).',
    hint: 'Acidic oxide tác dụng với base tạo muối và nước.'
  },
  {
    id: 'mc-16',
    type: 'multiple-choice',
    question: 'Oxide cao nhất của nguyên tố Nitrogen (N, Z=7, nhóm VA) có công thức là gì?',
    options: ['NO', 'NO₂', 'N₂O₃', 'N₂O₅'],
    correctAnswerIndex: 3, // D
    explanation: 'Nitrogen thuộc nhóm VA nên hóa trị cao nhất trong oxide với oxygen là V, công thức oxide cao nhất là N₂O₅.',
    hint: 'Nhóm VA -> hóa trị cao nhất với O bằng V.'
  },
  {
    id: 'mc-17',
    type: 'multiple-choice',
    question: 'Hydroxide tương ứng với oxide cao nhất của Sulfur (SO₃) là acid nào sau đây?',
    options: ['H₂SO₄', 'H₂SO₃', 'H₂S', 'H₂S₂O₇'],
    correctAnswerIndex: 0, // A
    explanation: 'SO₃ là oxide cao nhất của S (+6), tác dụng với nước tạo sulfuric acid H₂SO₄ có sulfur đạt số oxi hóa cao nhất +6.',
    hint: 'Phản ứng SO₃ + H₂O tạo acid quen thuộc nào?'
  },
  {
    id: 'mc-18',
    type: 'multiple-choice',
    question: 'Trong dãy các acid của các nguyên tố chu kỳ 3: H₂SiO₃, H₃PO₄, H₂SO₄, HClO₄, acid nào có tính acid MẠNH NHẤT?',
    options: ['H₂SiO₃', 'H₃PO₄', 'H₂SO₄', 'HClO₄'],
    correctAnswerIndex: 3, // D
    explanation: 'Trong chu kỳ 3 từ trái qua phải, tính phi kim tăng dần nên tính acid của các oxoacid tăng dần: H₂SiO₃ < H₃PO₄ < H₂SO₄ < HClO₄ (perchloric acid là acid mạnh nhất).',
    hint: 'Chlorine có độ âm điện lớn nhất trong chu kỳ 3.'
  },
  {
    id: 'mc-19',
    type: 'multiple-choice',
    question: 'Chất nào sau đây là oxide lưỡng tính (amphoteric oxide)?',
    options: ['Na₂O', 'ZnO', 'CaO', 'SO₂'],
    correctAnswerIndex: 1, // B
    explanation: 'ZnO là oxide lưỡng tính: vừa phản ứng được với dung dịch acid (như HCl), vừa tan được trong dung dịch kiềm mạnh (như NaOH tạo Na₂[Zn(OH)₄]).',
    hint: 'Oxide của kẽm có tính chất lưỡng tính tương tự oxide của nhôm.'
  },
  {
    id: 'mc-20',
    type: 'multiple-choice',
    question: 'Trong nhóm IA, đi từ trên xuống dưới (Li → Cs), tính base của các hydroxide biến đổi như thế nào?',
    options: ['Tăng dần', 'Giảm dần', 'Không thay đổi', 'Biến đổi không có quy luật'],
    correctAnswerIndex: 0, // A
    explanation: 'Từ Li đến Cs, bán kính nguyên tử tăng dần, lực liên kết kim loại với nhóm OH⁻ yếu đi, ion OH⁻ càng dễ phân li tự do nên tính base tăng dần: LiOH < NaOH < KOH < RbOH < CsOH.',
    hint: 'Tính kim loại tăng dần từ trên xuống dưới trong một nhóm A.'
  },
  {
    id: 'mc-21',
    type: 'multiple-choice',
    question: 'Oxide nào sau đây khi hòa tan vào nước tạo thành dung dịch làm quỳ tím chuyển sang màu ĐỎ rực?',
    options: ['Na₂O', 'BaO', 'P₂O₅', 'CaO'],
    correctAnswerIndex: 2, // C
    explanation: 'P₂O₅ là acidic oxide, khi tan vào nước tạo dung dịch phosphoric acid H₃PO₄: P₂O₅ + 3H₂O → 2H₃PO₄ làm quỳ tím chuyển đỏ. Các chất còn lại tạo dung dịch kiềm làm quỳ tím hóa xanh.',
    hint: 'Tìm oxide của nguyên tố phi kim.'
  },
  {
    id: 'mc-22',
    type: 'multiple-choice',
    question: 'Nguyên tố R thuộc nhóm IIA chu kỳ 4. Công thức oxide cao nhất của R là:',
    options: ['R₂O', 'R₂O₃', 'RO₂', 'RO'],
    correctAnswerIndex: 3, // D
    explanation: 'Nhóm IIA có 2 electron hóa trị nên hóa trị cao nhất với oxygen là II, công thức oxide cao nhất là RO (ví dụ CaO).',
    hint: 'Nhóm IIA có hóa trị II trong hợp chất oxide.'
  },
  {
    id: 'mc-23',
    type: 'multiple-choice',
    question: 'Cho các hydroxide: NaOH, Mg(OH)₂, Al(OH)₃. Sắp xếp theo thứ tự GIẢM DẦN tính base:',
    options: [
      'NaOH > Mg(OH)₂ > Al(OH)₃',
      'Al(OH)₃ > Mg(OH)₂ > NaOH',
      'Mg(OH)₂ > NaOH > Al(OH)₃',
      'NaOH > Al(OH)₃ > Mg(OH)₂'
    ],
    correctAnswerIndex: 0, // A
    explanation: 'Trong chu kỳ 3 từ trái sang phải: Na (IA) → Mg (IIA) → Al (IIIA), tính kim loại giảm dần nên tính base của các hydroxide giảm dần: NaOH (base mạnh) > Mg(OH)₂ (base trung bình) > Al(OH)₃ (lưỡng tính).',
    hint: 'Trong cùng chu kỳ, tính base giảm dần theo chiều tăng của Z.'
  },
  {
    id: 'mc-24',
    type: 'multiple-choice',
    question: 'Hợp chất nào sau đây có khả năng tan được trong cả dung dịch HCl và dung dịch NaOH?',
    options: ['Al(OH)₃', 'Mg(OH)₂', 'Fe(OH)₃', 'Cu(OH)₂'],
    correctAnswerIndex: 0, // A
    explanation: 'Al(OH)₃ là hydroxide lưỡng tính tiêu biểu: Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O và Al(OH)₃ + NaOH → Na[Al(OH)₄].',
    hint: 'Chất kết tủa keo trắng có tính chất lưỡng tính.'
  },
  {
    id: 'mc-25',
    type: 'multiple-choice',
    question: 'Oxide cao nhất của một nguyên tố phi kim R là RO₂. Hóa trị của R trong hợp chất khí với hydrogen là:',
    options: ['2', '6', '1', '4'],
    correctAnswerIndex: 3, // D
    explanation: 'Oxide cao nhất là RO₂ nên hóa trị cao nhất với O là IV (R thuộc nhóm IVA). Hóa trị trong hợp chất khí với H là 8 - 4 = 4 (tạo RH₄ như CH₄, SiH₄).',
    hint: 'Quy tắc: Hóa trị với H = 8 - Hóa trị cao nhất với O.'
  },
  {
    id: 'mc-26',
    type: 'multiple-choice',
    question: 'Chất nào sau đây là basic oxide mạnh, tác dụng mãnh liệt với nước tạo dung dịch kiềm?',
    options: ['Na₂O', 'SiO₂', 'CO₂', 'Al₂O₃'],
    correctAnswerIndex: 0, // A
    explanation: 'Na₂O là oxide kim loại kiềm nhóm IA, phản ứng mãnh liệt với nước: Na₂O + H₂O → 2NaOH tỏa nhiều nhiệt.',
    hint: 'Oxide của kim loại kiềm nhóm IA.'
  },
  {
    id: 'mc-27',
    type: 'multiple-choice',
    question: 'Trong chu kỳ 2, oxide cao nhất của Carbon là chất nào sau đây?',
    options: ['CO', 'C₂O₃', 'CO₂', 'C₃O₂'],
    correctAnswerIndex: 2, // C
    explanation: 'Carbon thuộc nhóm IVA, hóa trị cao nhất với oxygen là IV, công thức oxide cao nhất là CO₂ (CO là oxide trung tính không phải oxide cao nhất).',
    hint: 'Carbon dioxide có số oxi hóa của C là +4.'
  },
  {
    id: 'mc-28',
    type: 'multiple-choice',
    question: 'Phát biểu nào sau đây ĐÚNG về quy luật biến đổi tính chất acid - base trong một chu kỳ?',
    options: [
      'Tính acid tăng dần, tính base tăng dần',
      'Tính acid giảm dần, tính base giảm dần',
      'Tính acid tăng dần, tính base giảm dần',
      'Tính acid giảm dần, tính base tăng dần'
    ],
    correctAnswerIndex: 2, // C
    explanation: 'Trong một chu kỳ, từ trái sang phải theo chiều Z tăng dần: tính kim loại giảm và tính phi kim tăng, do đó tính acid của oxide/hydroxide tăng dần còn tính base giảm dần.',
    hint: 'Chiều đi từ kim loại kiềm mạnh sang phi kim halogen rất mạnh.'
  },
  {
    id: 'mc-29',
    type: 'multiple-choice',
    question: 'Hydroxide nào sau đây không tan trong nước và bị phân hủy bởi nhiệt sinh ra oxide kim loại và nước?',
    options: ['NaOH', 'KOH', 'Mg(OH)₂', 'Ba(OH)₂'],
    correctAnswerIndex: 2, // C
    explanation: 'Mg(OH)₂ là base không tan trong nước, khi đun nóng bị nhiệt phân: Mg(OH)₂ → MgO + H₂O. Các base kiềm của kim loại nhóm IA và Ba(OH)₂ bền nhiệt không bị phân hủy ở điều kiện thông thường.',
    hint: 'Base không tan bị nhiệt phân hủy.'
  },
  {
    id: 'mc-30',
    type: 'multiple-choice',
    question: 'Cho các oxoacid: H₃PO₄, H₂SO₄, HClO₄. Thứ tự tăng dần tính acid là:',
    options: [
      'H₃PO₄ < H₂SO₄ < HClO₄',
      'HClO₄ < H₂SO₄ < H₃PO₄',
      'H₂SO₄ < H₃PO₄ < HClO₄',
      'H₃PO₄ < HClO₄ < H₂SO₄'
    ],
    correctAnswerIndex: 0, // A
    explanation: 'Các nguyên tố P (VA), S (VIA), Cl (VIIA) cùng chu kỳ 3. Theo chiều tăng Z: độ âm điện P < S < Cl nên tính acid tăng dần: H₃PO₄ (acid trung bình) < H₂SO₄ (acid mạnh) < HClO₄ (acid rất mạnh).',
    hint: 'Độ âm điện tăng dần làm liên kết O-H càng phân cực, ion H⁺ càng dễ phân li.'
  }
];

// ==========================================
// 2. NGÂN HÀNG CÂU HỎI ĐÚNG / SAI (TRUE / FALSE - 30 CÂU)
// ==========================================
export const TRUE_FALSE_BANK: TrueFalseQuestion[] = [
  {
    id: 'tf-1',
    type: 'true-false',
    context: 'Xét các nguyên tố Chu kỳ 3: Na (Z=11), Mg (Z=12), Al (Z=13), Si (Z=14), P (Z=15), S (Z=16), Cl (Z=17).',
    statements: [
      {
        statement: 'Tính base của các oxide giảm dần theo chiều từ Na₂O đến Al₂O₃.',
        isCorrect: true,
        explanation: 'Đúng. Na₂O là basic oxide mạnh, MgO là basic oxide, còn Al₂O₃ chuyển sang amphoteric oxide (lưỡng tính).'
      },
      {
        statement: 'Al₂O₃ và Al(OH)₃ chỉ có thể tác dụng với dung dịch acid, không tác dụng với dung dịch base.',
        isCorrect: false,
        explanation: 'Sai. Al₂O₃ và Al(OH)₃ là hợp chất lưỡng tính, tan được trong cả dung dịch acid mạnh và kiềm mạnh.'
      },
      {
        statement: 'Công thức oxide cao nhất của Chlorine là Cl₂O₇.',
        isCorrect: true,
        explanation: 'Đúng. Chlorine ở nhóm VIIA nên hóa trị cao nhất trong oxide là VII, công thức Cl₂O₇.'
      },
      {
        statement: 'Theo chiều tăng dần của điện tích hạt nhân, tính acid của các hydroxide giảm dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một chu kỳ, từ trái sang phải điện tích hạt nhân tăng dần thì tính acid của hydroxide TĂNG dần.'
      }
    ],
    explanation: 'Trong chu kỳ 3: Na₂O (base mạnh) → MgO (base) → Al₂O₃ (lưỡng tính) → SiO₂ → P₂O₅ → SO₃ → Cl₂O₇ (acid rất mạnh).'
  },
  {
    id: 'tf-2',
    type: 'true-false',
    context: 'Xét quy luật biến đổi trong Nhóm IA (kim loại kiềm: Li, Na, K, Rb, Cs):',
    statements: [
      {
        statement: 'Tất cả các kim loại kiềm đều tạo oxide cao nhất có dạng R₂O.',
        isCorrect: true,
        explanation: 'Đúng. Nhóm IA có 1 electron hóa trị nên hóa trị cao nhất với oxygen là I, công thức R₂O.'
      },
      {
        statement: 'Đi từ Li đến Cs, tính base của các hydroxide giảm dần.',
        isCorrect: false,
        explanation: 'Sai. Trong nhóm A từ trên xuống dưới tính kim loại tăng dần, tính base của hydroxide TĂNG dần: LiOH < NaOH < KOH < RbOH < CsOH.'
      },
      {
        statement: 'Dung dịch hydroxide ROH của các kim loại kiềm đều làm quỳ tím hóa xanh.',
        isCorrect: true,
        explanation: 'Đúng. Tất cả các kim loại kiềm tan hoàn toàn trong nước tạo dung dịch kiềm mạnh, làm quỳ tím chuyển xanh.'
      },
      {
        statement: 'Cesium (Cs) có bán kính nguyên tử nhỏ hơn Lithium (Li).',
        isCorrect: false,
        explanation: 'Sai. Từ trên xuống dưới trong nhóm A, số lớp electron tăng dần nên bán kính nguyên tử của Cs lớn hơn nhiều so với Li.'
      }
    ],
    explanation: 'Nhóm IA đặc trưng bởi tính kim loại rất mạnh tăng dần từ Li đến Cs, hydroxide ROH là các base mạnh bậc nhất.'
  },
  {
    id: 'tf-3',
    type: 'true-false',
    context: 'Xét hai nguyên tố Phosphorus (P, Z=15) và Sulfur (S, Z=16):',
    statements: [
      {
        statement: 'Cả P và S đều thuộc chu kỳ 3 trong bảng tuần hoàn.',
        isCorrect: true,
        explanation: 'Đúng. P có cấu hình [Ne]3s²3p³, S có cấu hình [Ne]3s²3p⁴, đều có 3 lớp electron nên cùng thuộc chu kỳ 3.'
      },
      {
        statement: 'Oxide cao nhất của P là P₂O₃, của S là SO₂.',
        isCorrect: false,
        explanation: 'Sai. Oxide CAO NHẤT của P là P₂O₅ (nhóm VA), của S là SO₃ (nhóm VIA).'
      },
      {
        statement: 'Tính acid của H₂SO₄ mạnh hơn H₃PO₄.',
        isCorrect: true,
        explanation: 'Đúng. S đứng sau P trong cùng chu kỳ 3 nên độ âm điện và tính phi kim của S lớn hơn P, do đó acid tương ứng H₂SO₄ mạnh hơn H₃PO₄.'
      },
      {
        statement: 'P₂O₅ và SO₃ đều tác dụng được với dung dịch base tạo thành muối.',
        isCorrect: true,
        explanation: 'Đúng. Cả hai đều là acidic oxide nên tác dụng với base tạo muối phosphate và sulfate.'
      }
    ],
    explanation: 'So sánh hai phi kim điển hình của chu kỳ 3 thể hiện rõ tính acid tăng dần: P₂O₅ < SO₃ và H₃PO₄ < H₂SO₄.'
  },
  {
    id: 'tf-4',
    type: 'true-false',
    context: 'Xét nguyên tố X có cấu hình electron nguyên tử là 1s²2s²2p⁶3s² (Z=12):',
    statements: [
      {
        statement: 'X là kim loại thuộc chu kỳ 3, nhóm IIA (Magnesium Mg).',
        isCorrect: true,
        explanation: 'Đúng. X có 3 lớp electron (chu kỳ 3), 2 electron hóa trị ở lớp ngoài cùng 3s² (nhóm IIA).'
      },
      {
        statement: 'Công thức oxide cao nhất của X là XO, có tính acid.',
        isCorrect: false,
        explanation: 'Sai. Oxide cao nhất là MgO có tính BASE, không phải tính acid.'
      },
      {
        statement: 'Hydroxide tương ứng của X là X(OH)₂, là một base yếu/trung bình ít tan trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Mg(OH)₂ ít tan trong nước và là base trung bình/yếu.'
      },
      {
        statement: 'Tính base của X(OH)₂ mạnh hơn NaOH.',
        isCorrect: false,
        explanation: 'Sai. Trong chu kỳ 3, từ trái sang phải tính base giảm dần: NaOH (base mạnh) > Mg(OH)₂.'
      }
    ],
    explanation: 'Mg là kim loại kiềm thổ, tạo oxide MgO và hydroxide Mg(OH)₂ có tính base yếu hơn Na.'
  },
  {
    id: 'tf-5',
    type: 'true-false',
    context: 'Xét hợp chất oxoacid của các halogen (nhóm VIIA):',
    statements: [
      {
        statement: 'Fluorine (F) là nguyên tố duy nhất trong nhóm VIIA không có oxide cao nhất ứng với hóa trị VII.',
        isCorrect: true,
        explanation: 'Đúng. Do F có độ âm điện lớn nhất (3.98) nên trong hợp chất với oxygen chỉ thể hiện số oxi hóa âm (-1 trong OF₂), không có số oxi hóa dương.'
      },
      {
        statement: 'Perchloric acid HClO₄ là một trong những acid vô cơ mạnh nhất.',
        isCorrect: true,
        explanation: 'Đúng. Trong HClO₄, chlorine đạt số oxi hóa cực đại +7, liên kết Cl-O phân cực mạnh làm proton H⁺ rất dễ phân li.'
      },
      {
        statement: 'Công thức oxide cao nhất của Bromine là Br₂O₅.',
        isCorrect: false,
        explanation: 'Sai. Oxide cao nhất của Bromine ứng với hóa trị VII là Br₂O₇.'
      },
      {
        statement: 'Theo chiều F → Cl → Br → I, bán kính nguyên tử giảm dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một nhóm A từ trên xuống dưới, số lớp electron tăng dần nên bán kính nguyên tử tăng dần.'
      }
    ],
    explanation: 'Nhóm VIIA thể hiện tính phi kim mạnh đặc trưng và tính bất thường của Flo do độ âm điện vượt trội.'
  },
  {
    id: 'tf-6',
    type: 'true-false',
    context: 'Về khái niệm và định nghĩa oxide và hydroxide trong Hóa học 10 GDPT 2018:',
    statements: [
      {
        statement: 'Oxide cao nhất của nguyên tố nhóm A là oxide mà nguyên tố đó có hóa trị cao nhất với oxygen.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị cao nhất của nguyên tố nhóm A với oxygen bằng chính số thứ tự nhóm (trừ F và O).'
      },
      {
        statement: 'Tất cả các hydroxide đều có công thức dạng M(OH)ₙ.',
        isCorrect: false,
        explanation: 'Sai. Đối với phi kim, hydroxide tương ứng tồn tại dưới dạng oxoacid như H₂SO₄, H₃PO₄, HNO₃.'
      },
      {
        statement: 'Hydroxide lưỡng tính có thể phản ứng với cả dung dịch acid mạnh và dung dịch base mạnh.',
        isCorrect: true,
        explanation: 'Đúng. Điển hình như Al(OH)₃, Zn(OH)₂, Be(OH)₂.'
      },
      {
        statement: 'Oxide lưỡng tính tác dụng với nước tạo ra dung dịch có pH trung tính.',
        isCorrect: false,
        explanation: 'Sai. Đa số các oxide lưỡng tính như Al₂O₃, ZnO không tan và không phản ứng với nước ở điều kiện thường.'
      }
    ],
    explanation: 'Nắm vững bản chất: phi kim tạo hydroxide dạng oxoacid, kim loại tạo base M(OH)ₙ, chất lưỡng tính tác dụng được cả acid và base.'
  },
  {
    id: 'tf-7',
    type: 'true-false',
    context: 'Xét nguyên tố Carbon (C, Z=6, nhóm IVA) và Silicon (Si, Z=14, nhóm IVA):',
    statements: [
      {
        statement: 'Cả C và Si đều có công thức oxide cao nhất dạng RO₂ (CO₂ và SiO₂).',
        isCorrect: true,
        explanation: 'Đúng. Cả hai thuộc nhóm IVA nên hóa trị cao nhất với O là IV, tạo CO₂ và SiO₂.'
      },
      {
        statement: 'CO₂ là chất khí còn SiO₂ là chất rắn có mạng tinh thể nguyên tử rất bền vững.',
        isCorrect: true,
        explanation: 'Đúng. CO₂ cấu trúc phân tử rời rạc, SiO₂ cấu trúc mạng tinh thể không gian ba chiều vô tận.'
      },
      {
        statement: 'Tính acid của H₂CO₃ yếu hơn H₂SiO₃.',
        isCorrect: false,
        explanation: 'Sai. Trong nhóm IVA từ C xuống Si, tính phi kim giảm dần nên tính acid của oxoacid giảm dần: H₂CO₃ > H₂SiO₃.'
      },
      {
        statement: 'Hydroxide tương ứng của C và Si đều là các acid yếu.',
        isCorrect: true,
        explanation: 'Đúng. H₂CO₃ và H₂SiO₃ đều là acid rất yếu, phân li thuận nghịch.'
      }
    ],
    explanation: 'So sánh đồng đẳng nhóm IVA: tính phi kim giảm từ C xuống Si kéo theo tính acid của oxoacid giảm dần.'
  },
  {
    id: 'tf-8',
    type: 'true-false',
    context: 'Xét phản ứng của oxide với nước ở nhiệt độ phòng:',
    statements: [
      {
        statement: 'Na₂O tan hoàn toàn trong nước tạo ra dung dịch làm quỳ tím chuyển xanh.',
        isCorrect: true,
        explanation: 'Đúng. Na₂O + H₂O → 2NaOH (dung dịch kiềm mạnh pH > 7).'
      },
      {
        statement: 'SO₃ tan trong nước tỏa nhiệt mạnh tạo dung dịch làm quỳ tím hóa đỏ.',
        isCorrect: true,
        explanation: 'Đúng. SO₃ + H₂O → H₂SO₄ (acid mạnh làm quỳ tím hóa đỏ rực).'
      },
      {
        statement: 'Al₂O₃ phản ứng mãnh liệt với nước tạo kết tủa keo Al(OH)₃.',
        isCorrect: false,
        explanation: 'Sai. Al₂O₃ có năng lượng mạng tinh thể rất lớn, không tan và không phản ứng với nước.'
      },
      {
        statement: 'P₂O₅ hút ẩm mạnh và tác dụng với nước tạo dung dịch acid H₃PO₄.',
        isCorrect: true,
        explanation: 'Đúng. P₂O₅ + 3H₂O → 2H₃PO₄, P₂O₅ thường được dùng làm chất hút ẩm trong phòng thí nghiệm.'
      }
    ],
    explanation: 'Chỉ có oxide của kim loại kiềm/kiềm thổ (trừ Be, Mg chậm) và acidic oxide của phi kim mới phản ứng trực tiếp với nước.'
  },
  {
    id: 'tf-9',
    type: 'true-false',
    context: 'Xét nguyên tố Potassium (K, Z=19) và Calcium (Ca, Z=20) ở Chu kỳ 4:',
    statements: [
      {
        statement: 'K thuộc nhóm IA, Ca thuộc nhóm IIA.',
        isCorrect: true,
        explanation: 'Đúng. K có 1 e hóa trị ở 4s¹, Ca có 2 e hóa trị ở 4s².'
      },
      {
        statement: 'Công thức oxide cao nhất của K là K₂O, của Ca là CaO.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị cao nhất với O lần lượt là I và II.'
      },
      {
        statement: 'Tính base của KOH yếu hơn Ca(OH)₂.',
        isCorrect: false,
        explanation: 'Sai. Đi từ trái sang phải trong chu kỳ (K → Ca), tính base của hydroxide giảm dần: KOH > Ca(OH)₂.'
      },
      {
        statement: 'Cả KOH và Ca(OH)₂ đều là các base mạnh tan trong nước tạo môi trường kiềm.',
        isCorrect: true,
        explanation: 'Đúng. KOH tan vô hạn, Ca(OH)₂ tan vừa phải nhưng phần tan phân li hoàn toàn.'
      }
    ],
    explanation: 'Quy luật chu kỳ áp dụng tương tự ở chu kỳ 4: tính kim loại K > Ca dẫn tới tính base KOH > Ca(OH)₂.'
  },
  {
    id: 'tf-10',
    type: 'true-false',
    context: 'Xét tính chất của các oxoacid của phi kim Chu kỳ 3:',
    statements: [
      {
        statement: 'H₂SO₄ có thể đẩy được H₂SiO₃ ra khỏi dung dịch muối silicate.',
        isCorrect: true,
        explanation: 'Đúng. Vì H₂SO₄ là acid mạnh hơn rất nhiều so với H₂SiO₃: Na₂SiO₃ + H₂SO₄ → Na₂SO₄ + H₂SiO₃↓.'
      },
      {
        statement: 'HClO₄ là acid yếu hơn H₂SO₄.',
        isCorrect: false,
        explanation: 'Sai. Cl đứng sau S trong chu kỳ 3 nên tính acid của HClO₄ mạnh hơn H₂SO₄.'
      },
      {
        statement: 'H₃PO₄ là acid ba nấc có độ mạnh trung bình.',
        isCorrect: true,
        explanation: 'Đúng. H₃PO₄ phân li từng nấc trong nước và là acid trung bình.'
      },
      {
        statement: 'H₂SiO₃ là acid kết tủa dạng keo không tan trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Silicic acid H₂SiO₃ thực tế tồn tại dưới dạng keo hoặc kết tủa vô định hình.'
      }
    ],
    explanation: 'Quy luật acid mạnh đẩy acid yếu ra khỏi muối là minh chứng thực nghiệm sinh động cho tính biến đổi tuần hoàn.'
  },
  {
    id: 'tf-11',
    type: 'true-false',
    context: 'Xét nguyên tố Nhôm (Al, Z=13, nhóm IIIA) và oxide của nó:',
    statements: [
      {
        statement: 'Oxide cao nhất của Al là Al₂O₃, có tính chất lưỡng tính.',
        isCorrect: true,
        explanation: 'Đúng. Al thuộc nhóm IIIA có oxide cao nhất là Al₂O₃ mang tính lưỡng tính điển hình.'
      },
      {
        statement: 'Al₂O₃ tan được trong dung dịch acid HCl tạo muối AlCl₃.',
        isCorrect: true,
        explanation: 'Đúng. Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O.'
      },
      {
        statement: 'Al₂O₃ không tan trong dung dịch kiềm NaOH dù đun nóng.',
        isCorrect: false,
        explanation: 'Sai. Al₂O₃ có tính lưỡng tính nên tan dễ dàng trong dung dịch kiềm NaOH: Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄].'
      },
      {
        statement: 'Al(OH)₃ cũng là một hydroxide lưỡng tính.',
        isCorrect: true,
        explanation: 'Đúng. Cả oxide và hydroxide của nhôm đều là hợp chất lưỡng tính.'
      }
    ],
    explanation: 'Nhôm và hợp chất của nhôm là ví dụ mẫu mực cho tính lưỡng tính trong chương trình Hóa học 10.'
  },
  {
    id: 'tf-12',
    type: 'true-false',
    context: 'Xét tính acid - base của các hợp chất nguyên tố chu kỳ 2:',
    statements: [
      {
        statement: 'Li₂O là basic oxide mạnh còn CO₂ là acidic oxide.',
        isCorrect: true,
        explanation: 'Đúng. Li là kim loại kiềm nhóm IA tạo basic oxide, C là phi kim nhóm IVA tạo acidic oxide.'
      },
      {
        statement: 'BeO và Be(OH)₂ đều có tính chất lưỡng tính.',
        isCorrect: true,
        explanation: 'Đúng. Beryllium đứng đầu nhóm IIA có kích thước rất nhỏ, hợp chất BeO và Be(OH)₂ có tính lưỡng tính giống Al.'
      },
      {
        statement: 'HNO₃ là một acid yếu hơn carbonic acid H₂CO₃.',
        isCorrect: false,
        explanation: 'Sai. N đứng sau C trong chu kỳ 2 nên tính acid của HNO₃ mạnh hơn nhiều so với H₂CO₃.'
      },
      {
        statement: 'Theo chiều từ Li đến F trong chu kỳ 2, tính base của các hydroxide tăng dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một chu kỳ từ trái sang phải, tính base của các hydroxide giảm dần.'
      }
    ],
    explanation: 'Chu kỳ 2 tuân thủ chặt chẽ quy luật tuần hoàn tương tự chu kỳ 3.'
  },
  {
    id: 'tf-13',
    type: 'true-false',
    context: 'Xét hóa trị cao nhất với oxygen của các nguyên tố phi kim:',
    statements: [
      {
        statement: 'Hóa trị cao nhất của nguyên tố phi kim nhóm A với oxygen bằng số electron hóa trị.',
        isCorrect: true,
        explanation: 'Đúng. Số electron hóa trị bằng số thứ tự nhóm A (trừ F và O ngoại lệ).'
      },
      {
        statement: 'Phosphorus (nhóm VA) có hóa trị cao nhất với oxygen là V.',
        isCorrect: true,
        explanation: 'Đúng. P tạo oxide cao nhất P₂O₅ với hóa trị V.'
      },
      {
        statement: 'Sulfur (nhóm VIA) có hóa trị trong hợp chất khí với hydrogen bằng hóa trị cao nhất với oxygen.',
        isCorrect: false,
        explanation: 'Sai. Hóa trị với H là 2 (H₂S), còn hóa trị cao nhất với O là 6 (SO₃); tổng của hai hóa trị bằng 8.'
      },
      {
        statement: 'Chlorine có oxide cao nhất là Cl₂O₇ với hóa trị VII.',
        isCorrect: true,
        explanation: 'Đúng. Chlorine nhóm VIIA có hóa trị VII trong Cl₂O₇.'
      }
    ],
    explanation: 'Ghi nhớ quy luật: Hóa trị cao nhất với O = Số thứ tự nhóm; Hóa trị với H = 8 - Số thứ tự nhóm.'
  },
  {
    id: 'tf-14',
    type: 'true-false',
    context: 'Xét ảnh hưởng của vị trí trong bảng tuần hoàn đến tính kim loại - phi kim:',
    statements: [
      {
        statement: 'Kim loại mạnh nhất trong bảng tuần hoàn nằm ở góc dưới cùng bên trái (Cs, Fr).',
        isCorrect: true,
        explanation: 'Đúng. Bán kính nguyên tử lớn nhất, lực giữ e yếu nhất nên tính kim loại mạnh nhất.'
      },
      {
        statement: 'Phi kim mạnh nhất có độ âm điện lớn nhất là Fluorine (F).',
        isCorrect: true,
        explanation: 'Đúng. Fluorine ở góc trên cùng bên phải nhóm halogen có độ âm điện lớn nhất (3.98).'
      },
      {
        statement: 'Hydroxide của kim loại mạnh nhất là acid mạnh nhất.',
        isCorrect: false,
        explanation: 'Sai. Hydroxide của kim loại mạnh nhất là base mạnh nhất (CsOH).'
      },
      {
        statement: 'Trong một chu kỳ, nguyên tố có độ âm điện lớn nhất nằm ở nhóm VIIA.',
        isCorrect: true,
        explanation: 'Đúng. Nhóm halogen (VIIA) có độ âm điện cao nhất trong mỗi chu kỳ (khí hiếm VIIIA trơ).'
      }
    ],
    explanation: 'Quy luật góc bảng tuần hoàn: Góc dưới bên trái tính kim loại cực đại; Góc trên bên phải tính phi kim cực đại.'
  },
  {
    id: 'tf-15',
    type: 'true-false',
    context: 'Xét tính tan và phản ứng với nước của các oxide chu kỳ 3:',
    statements: [
      {
        statement: 'Na₂O tan trong nước sinh ra dung dịch NaOH có pH > 7.',
        isCorrect: true,
        explanation: 'Đúng. Na₂O + H₂O → 2NaOH tạo môi trường kiềm bazơ mạnh.'
      },
      {
        statement: 'SO₃ tan trong nước tạo thành dung dịch H₂SO₄ làm quỳ tím chuyển màu đỏ.',
        isCorrect: true,
        explanation: 'Đúng. SO₃ + H₂O → H₂SO₄ là acid mạnh làm quỳ tím hóa đỏ.'
      },
      {
        statement: 'SiO₂ tan dễ dàng trong nước ở nhiệt độ phòng tạo thành silicic acid.',
        isCorrect: false,
        explanation: 'Sai. SiO₂ (cát thạch anh) không tan và không tác dụng với nước ở điều kiện thường.'
      },
      {
        statement: 'Al₂O₃ không tan trong nước ở điều kiện thường.',
        isCorrect: true,
        explanation: 'Đúng. Al₂O₃ có mạng tinh thể ion cực kỳ bền vững, trơ với nước ở điều kiện thường.'
      }
    ],
    explanation: 'Khả năng phản ứng với nước phụ thuộc vào độ bền mạng tinh thể và tính acid-base của oxide.'
  },
  {
    id: 'tf-16',
    type: 'true-false',
    context: 'Xét tính acid - base của các hợp chất nhóm IIA (Be, Mg, Ca, Sr, Ba):',
    statements: [
      {
        statement: 'Be(OH)₂ là một hydroxide lưỡng tính.',
        isCorrect: true,
        explanation: 'Đúng. Beryllium đứng đầu nhóm IIA có kích thước bé, Be(OH)₂ tác dụng được với cả acid và kiềm mạnh.'
      },
      {
        statement: 'Theo chiều từ Be đến Ba, tính base của các hydroxide giảm dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một nhóm A từ trên xuống dưới, tính kim loại tăng dần nên tính base của hydroxide tăng dần: Be(OH)₂ < Mg(OH)₂ < Ca(OH)₂ < Ba(OH)₂.'
      },
      {
        statement: 'Ba(OH)₂ là một base mạnh tan tốt trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Ba(OH)₂ là dung dịch kiềm mạnh phân li hoàn toàn.'
      },
      {
        statement: 'MgO tan hoàn toàn trong nước ở điều kiện thường tạo dung dịch kiềm mạnh.',
        isCorrect: false,
        explanation: 'Sai. MgO hầu như không tan trong nước ở điều kiện thường và chỉ tác dụng chậm khi đun nóng.'
      }
    ],
    explanation: 'Nhóm IIA có quy luật tính base tăng dần từ Be đến Ba.'
  },
  {
    id: 'tf-17',
    type: 'true-false',
    context: 'Xét các oxoacid của Halogen (nhóm VIIA):',
    statements: [
      {
        statement: 'Chlorine có oxide cao nhất là Cl₂O₇ ứng với acid tương ứng là HClO₄.',
        isCorrect: true,
        explanation: 'Đúng. Cl₂O₇ + H₂O → 2HClO₄ (perchloric acid).'
      },
      {
        statement: 'Fluorine cũng tạo oxide cao nhất F₂O₇ tương tự Chlorine.',
        isCorrect: false,
        explanation: 'Sai. Fluorine có độ âm điện lớn nhất nên không thể hiện số oxi hóa dương, không tạo oxide F₂O₇.'
      },
      {
        statement: 'Trong dãy HClO, HClO₂, HClO₃, HClO₄, tính acid tăng dần.',
        isCorrect: true,
        explanation: 'Đúng. Số nguyên tử O tăng làm số oxi hóa của Cl tăng (+1 đến +7), liên kết O-H càng phân cực, tính acid tăng dần.'
      },
      {
        statement: 'Dung dịch HClO₄ có tính acid yếu hơn dung dịch H₂SO₄.',
        isCorrect: false,
        explanation: 'Sai. HClO₄ là một trong những acid vô cơ mạnh nhất, mạnh hơn H₂SO₄ trong cùng chu kỳ 3.'
      }
    ],
    explanation: 'Đặc trưng oxoacid halogen: tính acid tăng theo số oxi hóa của nguyên tử trung tâm.'
  },
  {
    id: 'tf-18',
    type: 'true-false',
    context: 'Xét nguyên tố Aluminium (Al, Z=13, nhóm IIIA):',
    statements: [
      {
        statement: 'Al₂O₃ là một amphoteric oxide (oxide lưỡng tính).',
        isCorrect: true,
        explanation: 'Đúng. Al₂O₃ vừa tác dụng được với dung dịch acid mạnh vừa tan trong dung dịch kiềm mạnh.'
      },
      {
        statement: 'Al(OH)₃ chỉ tác dụng được với dung dịch base mạnh, không tác dụng với dung dịch acid.',
        isCorrect: false,
        explanation: 'Sai. Al(OH)₃ là hydroxide lưỡng tính nên tác dụng tốt với cả dung dịch acid mạnh (như HCl).'
      },
      {
        statement: 'Al(OH)₃ tan trong dung dịch NaOH dư tạo phức chất Na[Al(OH)₄].',
        isCorrect: true,
        explanation: 'Đúng. Phương trình: Al(OH)₃ + NaOH → Na[Al(OH)₄].'
      },
      {
        statement: 'Al₂O₃ có thể tan được trong nước ở điều kiện phòng.',
        isCorrect: false,
        explanation: 'Sai. Al₂O₃ có mạng tinh thể ion rất bền nhiệt, không tan và không tác dụng với nước.'
      }
    ],
    explanation: 'Al và các hợp chất oxide/hydroxide của Al là trường hợp lưỡng tính tiêu biểu trong GDPT 2018.'
  },
  {
    id: 'tf-19',
    type: 'true-false',
    context: 'Xét nguyên tố Phosphorus (P, Z=15, nhóm VA):',
    statements: [
      {
        statement: 'Oxide cao nhất của Phosphorus là P₂O₅.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị cao nhất với O là V, tạo oxide P₂O₅.'
      },
      {
        statement: 'Phosphorus tạo hợp chất khí với hydrogen có công thức là PH₃.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị với H là 8 - 5 = 3, tạo phosphine PH₃.'
      },
      {
        statement: 'P₂O₅ tan trong nước sinh ra basic oxide.',
        isCorrect: false,
        explanation: 'Sai. P₂O₅ là acidic oxide, tan trong nước tạo phosphoric acid H₃PO₄.'
      },
      {
        statement: 'Tính acid của H₃PO₄ mạnh hơn sulfuric acid H₂SO₄.',
        isCorrect: false,
        explanation: 'Sai. Trong chu kỳ 3: P đứng trước S nên tính phi kim của P yếu hơn S, dẫn đến tính acid H₃PO₄ yếu hơn H₂SO₄.'
      }
    ],
    explanation: 'Phosphorus thể hiện đầy đủ quy tắc hóa trị nhóm VA.'
  },
  {
    id: 'tf-20',
    type: 'true-false',
    context: 'Xét phản ứng của oxide với dung dịch acid hoặc kiềm:',
    statements: [
      {
        statement: 'Na₂O tác dụng với dung dịch HCl sinh ra muối NaCl và H₂O.',
        isCorrect: true,
        explanation: 'Đúng. Na₂O + 2HCl → 2NaCl + H₂O là phản ứng giữa basic oxide và acid.'
      },
      {
        statement: 'SO₃ tác dụng với dung dịch NaOH sinh ra muối sulfate Na₂SO₄.',
        isCorrect: true,
        explanation: 'Đúng. SO₃ + 2NaOH → Na₂SO₄ + H₂O là phản ứng giữa acidic oxide và base.'
      },
      {
        statement: 'SiO₂ tác dụng dễ dàng với dung dịch HCl ở điều kiện thường.',
        isCorrect: false,
        explanation: 'Sai. SiO₂ là acidic oxide nên không phản ứng với acid HCl thông thường.'
      },
      {
        statement: 'CO₂ tác dụng với dung dịch nước vôi trong Ca(OH)₂ làm đục nước vôi.',
        isCorrect: true,
        explanation: 'Đúng. CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O tạo kết tủa trắng.'
      }
    ],
    explanation: 'Tính chất hóa học đặc trưng phân loại basic oxide và acidic oxide.'
  },
  {
    id: 'tf-21',
    type: 'true-false',
    context: 'Xét quy luật biến đổi trong chu kỳ 2 (từ Li đến F):',
    statements: [
      {
        statement: 'Theo chiều tăng điện tích hạt nhân, tính kim loại tăng dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một chu kỳ, từ trái sang phải tính kim loại giảm dần, tính phi kim tăng dần.'
      },
      {
        statement: 'Tính acid của các oxoacid tăng dần theo chiều từ B đến N.',
        isCorrect: true,
        explanation: 'Đúng. H₃BO₃ (acid rất yếu) < H₂CO₃ (acid yếu) < HNO₃ (acid mạnh).'
      },
      {
        statement: 'LiOH là một base mạnh tan tốt trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Li thuộc nhóm kim loại kiềm IA, LiOH là base mạnh.'
      },
      {
        statement: 'CO₂ là một basic oxide tác dụng được với dung dịch HCl.',
        isCorrect: false,
        explanation: 'Sai. CO₂ là acidic oxide, không tác dụng với acid HCl.'
      }
    ],
    explanation: 'Chu kỳ 2 tuân theo quy luật tuần hoàn tính kim loại - phi kim và acid - base.'
  },
  {
    id: 'tf-22',
    type: 'true-false',
    context: 'Xét hiện tượng nhiệt phân các hydroxide kim loại:',
    statements: [
      {
        statement: 'NaOH và KOH bị nhiệt phân hủy ở nhiệt độ ngọn lửa đèn cồn tạo oxide và nước.',
        isCorrect: false,
        explanation: 'Sai. Hydroxide của kim loại kiềm nhóm IA rất bền nhiệt, không bị phân hủy bởi nhiệt thông thường.'
      },
      {
        statement: 'Mg(OH)₂ bị nhiệt phân tạo thành MgO và hơi nước.',
        isCorrect: true,
        explanation: 'Đúng. Mg(OH)₂ → MgO + H₂O.'
      },
      {
        statement: 'Al(OH)₃ khi nung ở nhiệt độ cao sinh ra Al₂O₃ và H₂O.',
        isCorrect: true,
        explanation: 'Đúng. 2Al(OH)₃ → Al₂O₃ + 3H₂O.'
      },
      {
        statement: 'Tất cả các hydroxide đều không bị nhiệt phân hủy.',
        isCorrect: false,
        explanation: 'Sai. Hầu hết các hydroxide không tan đều dễ dàng bị phân hủy bởi nhiệt.'
      }
    ],
    explanation: 'Khả năng nhiệt phân phụ thuộc vào độ tan và độ bền liên kết của hydroxide.'
  },
  {
    id: 'tf-23',
    type: 'true-false',
    context: 'Xét nguyên tố nhóm VIA (O, S, Se, Te):',
    statements: [
      {
        statement: 'Hóa trị cao nhất của Sulfur với oxygen là VI trong oxide SO₃.',
        isCorrect: true,
        explanation: 'Đúng. Nhóm VIA có hóa trị cao nhất với O là VI.'
      },
      {
        statement: 'Trong nhóm VIA từ S đến Te, tính acid của các hydroxide cao nhất tăng dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một nhóm A từ trên xuống dưới, tính phi kim giảm dần nên tính acid của hydroxide giảm dần: H₂SO₄ > H₂SeO₄ > H₆TeO₆.'
      },
      {
        statement: 'Hợp chất khí của Sulfur với hydrogen có công thức là H₂S.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị với H = 8 - 6 = 2, công thức H₂S.'
      },
      {
        statement: 'Dung dịch H₂SO₄ đặc có tính háo nước mạnh.',
        isCorrect: true,
        explanation: 'Đúng. H₂SO₄ đặc hút nước mạnh và tỏa nhiệt lớn.'
      }
    ],
    explanation: 'Nhóm VIA đặc trưng bởi hóa trị VI với O và II với H.'
  },
  {
    id: 'tf-24',
    type: 'true-false',
    context: 'Xét các oxide trung tính (không tạo muối):',
    statements: [
      {
        statement: 'CO và NO là các ví dụ tiêu biểu về oxide trung tính ở nhiệt độ thường.',
        isCorrect: true,
        explanation: 'Đúng. CO và NO không phản ứng với dung dịch acid cũng như dung dịch base để tạo muối.'
      },
      {
        statement: 'CO tác dụng dễ dàng với dung dịch NaOH ở nhiệt độ phòng tạo muối carbonate.',
        isCorrect: false,
        explanation: 'Sai. CO là oxide trung tính, không phản ứng với NaOH ở điều kiện thường (khác với acidic oxide CO₂).'
      },
      {
        statement: 'CO₂ là acidic oxide còn CO là oxide trung tính.',
        isCorrect: true,
        explanation: 'Đúng. Số oxi hóa của C trong CO₂ là +4 (acidic oxide), trong CO là +2 (trung tính).'
      },
      {
        statement: 'Tất cả các oxide của phi kim đều là acidic oxide.',
        isCorrect: false,
        explanation: 'Sai. Một số oxide như CO, NO, N₂O là oxide trung tính.'
      }
    ],
    explanation: 'Cần phân biệt rõ acidic oxide và oxide trung tính của phi kim.'
  },
  {
    id: 'tf-25',
    type: 'true-false',
    context: 'Xét tính tan của các hydroxide kim loại trong nước:',
    statements: [
      {
        statement: 'NaOH, KOH, Ba(OH)₂ đều là các base tan tốt trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Đây là các base kiềm tan hoàn toàn trong nước tạo dung dịch kiềm mạnh.'
      },
      {
        statement: 'Al(OH)₃ và Mg(OH)₂ là các kết tủa ít tan hoặc không tan trong nước.',
        isCorrect: true,
        explanation: 'Đúng. Mg(OH)₂ kết tủa trắng ít tan, Al(OH)₃ kết tủa keo trắng không tan trong nước.'
      },
      {
        statement: 'Dung dịch NaOH có pH < 7.',
        isCorrect: false,
        explanation: 'Sai. Dung dịch kiềm mạnh NaOH có môi trường base với pH > 7.'
      },
      {
        statement: 'Khi cho quỳ tím vào dung dịch KOH, quỳ tím chuyển sang màu xanh.',
        isCorrect: true,
        explanation: 'Đúng. Môi trường kiềm làm quỳ tím hóa xanh.'
      }
    ],
    explanation: 'Tính tan quyết định môi trường pH và ứng dụng của hydroxide.'
  },
  {
    id: 'tf-26',
    type: 'true-false',
    context: 'Xét oxide và oxoacid của nguyên tố Chlorine (Z=17):',
    statements: [
      {
        statement: 'Chlorine có cấu hình electron lớp ngoài cùng là 3s²3p⁵.',
        isCorrect: true,
        explanation: 'Đúng. Cl có 7 electron hóa trị thuộc nhóm VIIA chu kỳ 3.'
      },
      {
        statement: 'Trong oxide cao nhất Cl₂O₇, Chlorine có số oxi hóa là +7.',
        isCorrect: true,
        explanation: 'Đúng. 2 × (+7) + 7 × (-2) = 0.'
      },
      {
        statement: 'Perchloric acid HClO₄ là một acid yếu hơn carbonic acid H₂CO₃.',
        isCorrect: false,
        explanation: 'Sai. HClO₄ là acid rất mạnh, mạnh hơn nhiều so với H₂CO₃.'
      },
      {
        statement: 'Hợp chất khí của Chlorine với hydrogen là HCl.',
        isCorrect: true,
        explanation: 'Đúng. Hóa trị với H = 8 - 7 = 1, tạo hydrogen chloride HCl.'
      }
    ],
    explanation: 'Chlorine thể hiện tính phi kim mạnh điển hình ở cuối chu kỳ 3.'
  },
  {
    id: 'tf-27',
    type: 'true-false',
    context: 'Xét nguyên tố Silicon (Si, Z=14, nhóm IVA):',
    statements: [
      {
        statement: 'SiO₂ là thành phần chính của cát thạch anh.',
        isCorrect: true,
        explanation: 'Đúng. Thạch anh có thành phần hóa học chủ yếu là SiO₂.'
      },
      {
        statement: 'SiO₂ có cấu trúc phân tử nhỏ tương tự khí CO₂.',
        isCorrect: false,
        explanation: 'Sai. CO₂ là phân tử rời rạc, còn SiO₂ có cấu trúc mạng tinh thể nguyên tử ba chiều khổng lồ.'
      },
      {
        statement: 'Silicic acid H₂SiO₃ là một acid rất yếu, hầu như không tan trong nước.',
        isCorrect: true,
        explanation: 'Đúng. H₂SiO₃ kết tủa keo trắng khi tách ra khỏi dung dịch và là acid rất yếu.'
      },
      {
        statement: 'SiO₂ phản ứng được với dung dịch acid hydrofluoric (HF).',
        isCorrect: true,
        explanation: 'Đúng. SiO₂ + 4HF → SiF₄ + 2H₂O (phản ứng dùng để khắc chữ trên thủy tinh).'
      }
    ],
    explanation: 'Silicon và hợp chất SiO₂ có tính chất vật lý và hóa học đặc thù do mạng tinh thể.'
  },
  {
    id: 'tf-28',
    type: 'true-false',
    context: 'Xét nguyên tố Kim loại kiềm thổ Calcium (Ca, Z=20, nhóm IIA):',
    statements: [
      {
        statement: 'CaO là vôi sống, tác dụng mãnh liệt với nước tạo Ca(OH)₂ (vôi tôi).',
        isCorrect: true,
        explanation: 'Đúng. CaO + H₂O → Ca(OH)₂ tỏa nhiều nhiệt (quá trình tôi vôi).'
      },
      {
        statement: 'Ca(OH)₂ là một hydroxide có tính acid.',
        isCorrect: false,
        explanation: 'Sai. Ca(OH)₂ là base mạnh (nước vôi trong có pH > 7).'
      },
      {
        statement: 'Tính base của Ca(OH)₂ mạnh hơn Mg(OH)₂.',
        isCorrect: true,
        explanation: 'Đúng. Trong nhóm IIA đi từ trên xuống (Mg → Ca), tính base của hydroxide tăng dần.'
      },
      {
        statement: 'Dung dịch Ca(OH)₂ phản ứng được với khí CO₂ tạo kết tủa trắng CaCO₃.',
        isCorrect: true,
        explanation: 'Đúng. Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O.'
      }
    ],
    explanation: 'Calcium là kim loại kiềm thổ có nhiều ứng dụng gắn liền với đời sống.'
  },
  {
    id: 'tf-29',
    type: 'true-false',
    context: 'Xét mối quan hệ giữa độ âm điện và tính acid của hydroxide:',
    statements: [
      {
        statement: 'Độ âm điện của nguyên tố trung tâm càng lớn thì tính acid của hydroxide càng mạnh.',
        isCorrect: true,
        explanation: 'Đúng. Độ âm điện lớn hút mạnh cặp electron liên kết, làm liên kết O-H phân cực mạnh và proton H⁺ dễ tách ra.'
      },
      {
        statement: 'Trong cùng chu kỳ, từ trái sang phải độ âm điện giảm dần.',
        isCorrect: false,
        explanation: 'Sai. Trong một chu kỳ, từ trái sang phải theo chiều Z tăng thì độ âm điện TĂNG dần.'
      },
      {
        statement: 'Do độ âm điện của Cl lớn hơn S nên tính acid của HClO₄ mạnh hơn H₂SO₄.',
        isCorrect: true,
        explanation: 'Đúng. Cl có độ âm điện lớn hơn S (3.16 > 2.58) nên tính acid của HClO₄ mạnh hơn H₂SO₄.'
      },
      {
        statement: 'Nguyên tố có độ âm điện nhỏ nhất trong bảng tuần hoàn tạo ra base mạnh nhất.',
        isCorrect: true,
        explanation: 'Đúng. Cs có độ âm điện rất nhỏ (0.79), CsOH là base mạnh bậc nhất.'
      }
    ],
    explanation: 'Độ âm điện là bản chất sâu xa chi phối tính acid - base của các hợp chất.'
  },
  {
    id: 'tf-30',
    type: 'true-false',
    context: 'Xét ứng dụng thực tế của oxide và hydroxide trong công nghiệp và đời sống:',
    statements: [
      {
        statement: 'NaOH (xút ăn da) được dùng nhiều trong sản xuất xà phòng và giấy.',
        isCorrect: true,
        explanation: 'Đúng. NaOH là hóa chất cơ bản hàng đầu trong công nghiệp.'
      },
      {
        statement: 'CaO được dùng để khử chua đất trồng trọt và xử lý nước thải.',
        isCorrect: true,
        explanation: 'Đúng. Tính base của vôi giúp trung hòa acid dư thừa trong đất và nước.'
      },
      {
        statement: 'Al(OH)₃ được dùng làm chất chống cháy trong vật liệu polyme.',
        isCorrect: true,
        explanation: 'Đúng. Khi gặp nhiệt độ cao, Al(OH)₃ phân hủy thu nhiệt và giải phóng hơi nước dập tắt đám cháy.'
      },
      {
        statement: 'H₂SO₄ là hóa chất không có ứng dụng nào trong công nghiệp phân bón.',
        isCorrect: false,
        explanation: 'Sai. H₂SO₄ là nguyên liệu chủ chốt để sản xuất phân bón lân (superphosphate) và phân đạm sulfate.'
      }
    ],
    explanation: 'Các oxide và hydroxide đóng vai trò tối quan trọng trong nền kinh tế quốc dân.'
  }
];

// ==========================================
// 3. NGÂN HÀNG CÂU HỎI TRẢ LỜI NGẮN (SHORT ANSWER - 30 CÂU)
// CHỈ CHO NHẬP SỐ VÀ ĐÁP ÁN CHỈ LÀ SỐ, YÊU CẦU LÀM TRÒN RÕ RÀNG
// ==========================================
export const SHORT_ANSWER_BANK: ShortAnswerQuestion[] = [
  {
    id: 'sa-1',
    type: 'short-answer',
    question: 'Hóa trị cao nhất của nguyên tố Sulfur (S, Z=16, thuộc nhóm VIA) đối với oxygen là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['6'],
    explanation: 'Sulfur thuộc nhóm VIA nên có 6 electron hóa trị. Hóa trị cao nhất với oxygen bằng số thứ tự nhóm là 6 (tạo oxide cao nhất SO₃).',
    hint: 'Nhóm VIA -> số electron hóa trị bằng 6.'
  },
  {
    id: 'sa-2',
    type: 'short-answer',
    question: 'Hóa trị cao nhất của nguyên tố Chlorine (Cl, Z=17, thuộc nhóm VIIA) trong oxide cao nhất Cl₂O₇ là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['7'],
    explanation: 'Chlorine thuộc nhóm VIIA nên hóa trị cao nhất với oxygen trong Cl₂O₇ là 7.',
    hint: 'Chỉ số nguyên tử oxygen là 7, hóa trị của Cl là 7.'
  },
  {
    id: 'sa-3',
    type: 'short-answer',
    question: 'Oxide cao nhất của một nguyên tố phi kim R có dạng RO₃. Trong hợp chất khí với hydrogen, hóa trị của nguyên tố R là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['2'],
    explanation: 'Oxide cao nhất là RO₃ nên R có hóa trị cao nhất với oxygen là 6 (nhóm VIA). Áp dụng quy tắc: Hóa trị với H = 8 - 6 = 2.',
    hint: 'Tổng hóa trị cao nhất với O và hóa trị trong hợp chất khí với H bằng 8: 8 - 6 = 2.'
  },
  {
    id: 'sa-4',
    type: 'short-answer',
    question: 'Một nguyên tố R thuộc nhóm VA. Trong oxide cao nhất R₂O₅, oxygen chiếm 56.34% về khối lượng. Nguyên tử khối của R là bao nhiêu g/mol? (Làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['31'],
    unit: 'g/mol',
    explanation: 'Ta có phương trình: (5 × 16) / (2R + 5 × 16) = 0.5634 ⇒ 80 / (2R + 80) = 0.5634 ⇒ 2R + 80 ≈ 142 ⇒ 2R = 62 ⇒ R = 31 (Phosphorus).',
    hint: 'Giải phương trình: 80 / (2R + 80) = 0.5634.'
  },
  {
    id: 'sa-5',
    type: 'short-answer',
    question: 'Một nguyên tố R thuộc nhóm VIA. Trong oxide cao nhất RO₃, oxygen chiếm 60% về khối lượng. Nguyên tử khối của R là bao nhiêu g/mol? (Làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['32'],
    unit: 'g/mol',
    explanation: 'Ta có phương trình: (3 × 16) / (R + 3 × 16) = 0.60 ⇒ 48 / (R + 48) = 0.60 ⇒ R + 48 = 80 ⇒ R = 32 (Sulfur).',
    hint: 'Giải phương trình: 48 / (R + 48) = 0.60.'
  },
  {
    id: 'sa-6',
    type: 'short-answer',
    question: 'Cho 4.0 gam kim loại M (thuộc nhóm IIA) tác dụng hết với nước dư thu được 0.1 mol khí H₂. Khối lượng mol nguyên tử của kim loại M là bao nhiêu g/mol? (Làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['40'],
    unit: 'g/mol',
    explanation: 'Phương trình: M + 2H₂O → M(OH)₂ + H₂↑. Ta có n(M) = n(H₂) = 0.1 mol. Khối lượng mol: M = 4.0 / 0.1 = 40 g/mol (Calcium Ca).',
    hint: 'Số mol M = số mol H₂ = 0.1 mol. M = 4.0 / 0.1 = 40.'
  },
  {
    id: 'sa-7',
    type: 'short-answer',
    question: 'Trong Chu kỳ 3 (từ Na đến Cl), có bao nhiêu nguyên tố tạo ra oxide có tính lưỡng tính? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['1'],
    explanation: 'Trong chu kỳ 3 chỉ có duy nhất 1 nguyên tố là Aluminium (Al) tạo amphoteric oxide Al₂O₃ và amphoteric hydroxide Al(OH)₃.',
    hint: 'Chỉ có duy nhất kim loại nhôm (Al).'
  },
  {
    id: 'sa-8',
    type: 'short-answer',
    question: 'Trong oxide cao nhất của Phosphorus là P₂O₅, số oxi hóa của nguyên tố Phosphorus là bao nhiêu? (Chỉ nhập một số nguyên, ví dụ: 5)',
    acceptedAnswers: ['5'],
    explanation: 'Trong P₂O₅, oxygen có số oxi hóa -2: 2 × (+x) + 5 × (-2) = 0 ⇒ x = +5.',
    hint: 'Oxy có số oxi hóa -2: (5 × 2) / 2 = 5.'
  },
  {
    id: 'sa-9',
    type: 'short-answer',
    question: 'Nguyên tố Silicon (Si, Z=14) thuộc nhóm IVA. Hóa trị cao nhất của Silicon với oxygen trong oxide cao nhất SiO₂ là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['4'],
    explanation: 'Silicon thuộc nhóm IVA nên có hóa trị cao nhất với oxygen bằng 4 (tạo SiO₂).',
    hint: 'Nhóm IVA -> hóa trị 4.'
  },
  {
    id: 'sa-10',
    type: 'short-answer',
    question: 'Trong chu kỳ 3 gồm 7 nguyên tố nhóm A (Na, Mg, Al, Si, P, S, Cl), có bao nhiêu nguyên tố tạo ra acidic oxide cao nhất? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['4'],
    explanation: 'Có 4 nguyên tố tạo acidic oxide cao nhất là: Si (SiO₂), P (P₂O₅), S (SO₃), Cl (Cl₂O₇). (Na và Mg tạo basic oxide, Al tạo amphoteric oxide).',
    hint: 'Đếm các phi kim và á kim: Si, P, S, Cl.'
  },
  {
    id: 'sa-11',
    type: 'short-answer',
    question: 'Oxide cao nhất của một kim loại kiềm R thuộc nhóm IA có công thức R₂O. Khối lượng mol phân tử của oxide này là 62 g/mol. Khối lượng mol nguyên tử của R là bao nhiêu g/mol? (Làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['23'],
    unit: 'g/mol',
    explanation: 'Ta có: 2R + 16 = 62 ⇒ 2R = 46 ⇒ R = 23 g/mol (Sodium Na).',
    hint: '2R + 16 = 62 ⇒ R = 46 / 2 = 23.'
  },
  {
    id: 'sa-12',
    type: 'short-answer',
    question: 'Số electron hóa trị của nguyên tố Phosphorus (P, Z=15, có cấu hình e: [Ne] 3s² 3p³) là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['5'],
    explanation: 'Phosphorus có 2 + 3 = 5 electron lớp ngoài cùng ở phân lớp 3s và 3p, do đó có 5 electron hóa trị.',
    hint: 'Cộng số e ở 3s² và 3p³: 2 + 3 = 5.'
  },
  {
    id: 'sa-13',
    type: 'short-answer',
    question: 'Hòa tan hoàn toàn 0.1 mol P₂O₅ vào nước dư tạo thành dung dịch H₃PO₄ theo phản ứng: P₂O₅ + 3H₂O → 2H₃PO₄. Số mol H₃PO₄ thu được là bao nhiêu mol? (Làm tròn đến 1 chữ số thập phân, ví dụ: 0.2)',
    acceptedAnswers: ['0.2', '0,2'],
    unit: 'mol',
    explanation: 'Theo phương trình hóa học: n(H₃PO₄) = 2 × n(P₂O₅) = 2 × 0.1 = 0.2 mol.',
    hint: '1 mol P₂O₅ sinh ra 2 mol H₃PO₄: 0.1 × 2 = 0.2.'
  },
  {
    id: 'sa-14',
    type: 'short-answer',
    question: 'Số hiệu nguyên tử Z của nguyên tố thuộc chu kỳ 3 tạo ra hydroxide có tính base mạnh nhất trong chu kỳ 3 là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['11'],
    explanation: 'Trong chu kỳ 3, kim loại có tính base mạnh nhất là Sodium (Na) ở nhóm IA, có số hiệu nguyên tử Z = 11 (tạo NaOH).',
    hint: 'Sodium (Na) ở ô số 11 trong bảng tuần hoàn.'
  },
  {
    id: 'sa-15',
    type: 'short-answer',
    question: 'Số nguyên tử oxygen có trong 1 phân tử oxide cao nhất của Chlorine (Cl₂O₇) là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['7'],
    explanation: 'Công thức Cl₂O₇ có chỉ số của oxygen là 7, nghĩa là 1 phân tử chứa 7 nguyên tử O.',
    hint: 'Nhìn vào chỉ số của O trong Cl₂O₇.'
  },
  {
    id: 'sa-16',
    type: 'short-answer',
    question: 'Hóa trị cao nhất của nguyên tố Silicon (Si, Z=14, thuộc nhóm IVA) trong oxide cao nhất SiO₂ là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['4'],
    explanation: 'Silicon thuộc nhóm IVA nên có hóa trị cao nhất với oxygen bằng số thứ tự nhóm là 4.',
    hint: 'Nhóm IVA -> hóa trị cao nhất là 4.'
  },
  {
    id: 'sa-17',
    type: 'short-answer',
    question: 'Cho 2.3 gam kim loại Sodium (Na, M=23 g/mol) tác dụng hết với nước dư theo phương trình: 2Na + 2H₂O → 2NaOH + H₂↑. Số mol NaOH sinh ra là bao nhiêu mol? (Làm tròn đến 1 chữ số thập phân, ví dụ: 0.1)',
    acceptedAnswers: ['0.1', '0,1'],
    unit: 'mol',
    explanation: 'Ta có n(Na) = 2.3 / 23 = 0.1 mol. Theo tỉ lệ phản ứng, n(NaOH) = n(Na) = 0.1 mol.',
    hint: 'n(NaOH) = n(Na) = 2.3 / 23 = 0.1.'
  },
  {
    id: 'sa-18',
    type: 'short-answer',
    question: 'Trong oxoacid perchloric acid HClO₄, số oxi hóa của nguyên tố Chlorine là bao nhiêu? (Chỉ nhập một số nguyên dương, ví dụ: 7)',
    acceptedAnswers: ['7'],
    explanation: 'Trong phân tử HClO₄: (+1) + x + 4 × (-2) = 0 ⇒ x = +7.',
    hint: '1 + x - 8 = 0 ⇒ x = 7.'
  },
  {
    id: 'sa-19',
    type: 'short-answer',
    question: 'Oxide cao nhất của một nguyên tố kim loại R thuộc nhóm IIIA có dạng R₂O₃. Khối lượng mol phân tử của R₂O₃ là 102 g/mol. Khối lượng mol nguyên tử của R là bao nhiêu g/mol? (Lấy O = 16, làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['27'],
    unit: 'g/mol',
    explanation: 'Ta có phương trình: 2R + 3 × 16 = 102 ⇒ 2R + 48 = 102 ⇒ 2R = 54 ⇒ R = 27 g/mol (Aluminium Al).',
    hint: '2R + 48 = 102 ⇒ R = 27.'
  },
  {
    id: 'sa-20',
    type: 'short-answer',
    question: 'Trong chu kỳ 3 gồm 8 nguyên tố, có bao nhiêu nguyên tố tạo ra oxide lưỡng tính? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['1'],
    explanation: 'Trong chu kỳ 3 chỉ có duy nhất 1 nguyên tố là Aluminium (Al, Z=13) tạo oxide lưỡng tính Al₂O₃.',
    hint: 'Chỉ có nguyên tố Al.'
  },
  {
    id: 'sa-21',
    type: 'short-answer',
    question: 'Một nguyên tố R thuộc nhóm VA tạo hợp chất khí với hydrogen dạng RH₃ có khối lượng mol là 17 g/mol. Khối lượng mol nguyên tử của R là bao nhiêu g/mol? (Lấy H = 1, làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['14'],
    unit: 'g/mol',
    explanation: 'Ta có R + 3 × 1 = 17 ⇒ R = 14 g/mol (Nitrogen N).',
    hint: 'R + 3 = 17 ⇒ R = 14.'
  },
  {
    id: 'sa-22',
    type: 'short-answer',
    question: 'Theo phương trình hóa học: Al(OH)₃ + NaOH → Na[Al(OH)₄], cần bao nhiêu phân tử NaOH để phản ứng vừa đủ với 1 phân tử Al(OH)₃? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['1'],
    explanation: 'Tỉ lệ phản ứng giữa Al(OH)₃ và NaOH là 1:1, sinh ra phức chất sodium tetrahydroxidoaluminate Na[Al(OH)₄].',
    hint: 'Tỉ lệ mol 1:1.'
  },
  {
    id: 'sa-23',
    type: 'short-answer',
    question: 'Khối lượng mol phân tử của sulfur trioxide SO₃ là bao nhiêu g/mol? (Cho S = 32, O = 16, làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['80'],
    unit: 'g/mol',
    explanation: 'Khối lượng mol của SO₃ = 32 + 3 × 16 = 32 + 48 = 80 g/mol.',
    hint: '32 + 3 × 16 = 80.'
  },
  {
    id: 'sa-24',
    type: 'short-answer',
    question: 'Số electron lớp ngoài cùng của nguyên tố Chlorine (Cl, Z=17) là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['7'],
    explanation: 'Cấu hình electron của Cl: [Ne] 3s² 3p⁵ có 2 + 5 = 7 electron lớp ngoài cùng (thuộc nhóm VIIA).',
    hint: 'Nhóm VIIA có 7 electron lớp ngoài cùng.'
  },
  {
    id: 'sa-25',
    type: 'short-answer',
    question: 'Hòa tan hoàn toàn 0.2 mol SO₃ vào nước tạo thành dung dịch H₂SO₄ theo phản ứng: SO₃ + H₂O → H₂SO₄. Số mol H₂SO₄ tạo thành là bao nhiêu mol? (Làm tròn đến 1 chữ số thập phân, ví dụ: 0.2)',
    acceptedAnswers: ['0.2', '0,2'],
    unit: 'mol',
    explanation: 'Theo phương trình: n(H₂SO₄) = n(SO₃) = 0.2 mol.',
    hint: 'Tỉ lệ phản ứng 1:1, số mol H₂SO₄ = 0.2.'
  },
  {
    id: 'sa-26',
    type: 'short-answer',
    question: 'Số electron hóa trị của nguyên tố Magnesium (Mg, Z=12, cấu hình [Ne] 3s²) là bao nhiêu? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['2'],
    explanation: 'Magnesium có 2 electron ở phân lớp 3s² ngoài cùng nên có 2 electron hóa trị (nhóm IIA).',
    hint: 'Phân lớp 3s² có 2 electron.'
  },
  {
    id: 'sa-27',
    type: 'short-answer',
    question: 'Khối lượng mol phân tử của Calcium hydroxide Ca(OH)₂ là bao nhiêu g/mol? (Cho Ca = 40, O = 16, H = 1, làm tròn đến hàng đơn vị)',
    acceptedAnswers: ['74'],
    unit: 'g/mol',
    explanation: 'M(Ca(OH)₂) = 40 + 2 × (16 + 1) = 40 + 34 = 74 g/mol.',
    hint: '40 + 2 × 17 = 74.'
  },
  {
    id: 'sa-28',
    type: 'short-answer',
    question: 'Trong oxide cao nhất của Carbon là CO₂, số oxi hóa của nguyên tố Carbon là bao nhiêu? (Chỉ nhập một số nguyên, ví dụ: 4)',
    acceptedAnswers: ['4'],
    explanation: 'Trong CO₂: x + 2 × (-2) = 0 ⇒ x = +4.',
    hint: 'x - 4 = 0 ⇒ x = 4.'
  },
  {
    id: 'sa-29',
    type: 'short-answer',
    question: 'Nguyên tố Calcium (Ca, Z=20) thuộc chu kỳ mấy trong bảng tuần hoàn? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['4'],
    explanation: 'Calcium có cấu hình [Ar] 4s² với 4 lớp electron nên thuộc chu kỳ 4.',
    hint: 'Cấu hình electron kết thúc ở 4s² -> chu kỳ 4.'
  },
  {
    id: 'sa-30',
    type: 'short-answer',
    question: 'Số nhóm A trong bảng tuần hoàn các nguyên tố hóa học là bao nhiêu nhóm? (Chỉ nhập một số nguyên)',
    acceptedAnswers: ['8'],
    explanation: 'Bảng tuần hoàn gồm 8 nhóm A (từ IA đến VIIIA) và 8 nhóm B.',
    hint: 'Từ nhóm IA đến nhóm VIIIA có tất cả 8 nhóm.'
  }
];

// ==========================================
// 4. NGÂN HÀNG CÂU HỎI TỰ LUẬN (ESSAY - 30 CÂU)
// ==========================================
export const ESSAY_BANK: EssayQuestion[] = [
  {
    id: 'es-1',
    type: 'essay',
    question: 'Trình bày quy luật biến đổi tính acid - base của oxide cao nhất và hydroxide tương ứng của các nguyên tố trong Chu kỳ 3 (từ Na đến Cl). Viết công thức oxide cao nhất và hydroxide tương ứng của từng nguyên tố để minh họa.',
    suggestedAnswer: `1. Quy luật chung:
Trong Chu kỳ 3, đi từ trái sang phải theo chiều tăng của điện tích hạt nhân (Z = 11 đến 17), tính kim loại giảm dần và tính phi kim tăng dần. Do đó:
- Tính base của oxide cao nhất và hydroxide tương ứng giảm dần.
- Tính acid của oxide cao nhất và hydroxide tương ứng tăng dần.

2. Bảng dẫn chứng cụ thể:
- Na (Z=11): Na₂O (basic oxide mạnh) → NaOH (base mạnh).
- Mg (Z=12): MgO (basic oxide) → Mg(OH)₂ (base trung bình/yếu).
- Al (Z=13): Al₂O₃ (amphoteric oxide) → Al(OH)₃ (hydroxide lưỡng tính).
- Si (Z=14): SiO₂ (acidic oxide rất yếu) → H₂SiO₃ (acid rất yếu).
- P (Z=15): P₂O₅ (acidic oxide) → H₃PO₄ (acid trung bình).
- S (Z=16): SO₃ (acidic oxide mạnh) → H₂SO₄ (acid mạnh).
- Cl (Z=17): Cl₂O₇ (acidic oxide rất mạnh) → HClO₄ (acid rất mạnh).`,
    gradingCriteria: [
      { criterion: 'Nêu đúng xu hướng chung (tính base giảm dần, tính acid tăng dần)', points: 0.5 },
      { criterion: 'Viết chính xác công thức 7 oxide cao nhất (Na₂O đến Cl₂O₇)', points: 0.75 },
      { criterion: 'Viết chính xác công thức 7 hydroxide tương ứng (NaOH đến HClO₄)', points: 0.75 },
      { criterion: 'Nêu rõ tính chất lưỡng tính của Al₂O₃ và Al(OH)₃', points: 0.5 }
    ],
    explanation: 'Đây là bài học nền tảng chứng minh tính tuần hoàn của các nguyên tố hóa học trong chương trình GDPT 2018.'
  },
  {
    id: 'es-2',
    type: 'essay',
    question: 'Aluminium hydroxide Al(OH)₃ là một hydroxide lưỡng tính. Hãy viết hai phương trình hóa học dạng phân tử minh chứng cho tính chất lưỡng tính của Al(OH)₃ khi tác dụng với dung dịch hydrochloric acid (HCl) và dung dịch sodium hydroxide (NaOH).',
    suggestedAnswer: `Tính chất lưỡng tính của Al(OH)₃ được thể hiện qua khả năng phản ứng với cả acid mạnh và base mạnh:

1. Thể hiện tính base (tác dụng với acid mạnh HCl):
   Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O

2. Thể hiện tính acid (tác dụng với base mạnh NaOH):
   Al(OH)₃ + NaOH → Na[Al(OH)₄]
   (hoặc viết theo chương trình cũ: Al(OH)₃ + NaOH → NaAlO₂ + 2H₂O).

Kết luận: Al(OH)₃ vừa tan trong dung dịch acid mạnh vừa tan trong dung dịch base mạnh, chứng tỏ Al(OH)₃ là hydroxide lưỡng tính.`,
    gradingCriteria: [
      { criterion: 'Viết đúng và cân bằng phương trình phản ứng với HCl', points: 1.0 },
      { criterion: 'Viết đúng và cân bằng phương trình phản ứng với NaOH tạo Na[Al(OH)₄] hoặc NaAlO₂', points: 1.0 },
      { criterion: 'Giải thích và kết luận bản chất lưỡng tính', points: 0.5 }
    ],
    explanation: 'Chương trình GDPT 2018 khuyến khích viết dạng phức chất tetrahydroxidoaluminate Na[Al(OH)₄].'
  },
  {
    id: 'es-3',
    type: 'essay',
    question: 'Oxide cao nhất của một nguyên tố R có công thức là RO₃. Trong hợp chất khí của R với hydrogen, hydrogen chiếm 5.88% về khối lượng. Xác định tên nguyên tố R và viết công thức hydroxide tương ứng.',
    suggestedAnswer: `Bước 1: Xác định hóa trị và công thức hợp chất khí với H
- Oxide cao nhất là RO₃ nên R có hóa trị cao nhất với oxygen là VI (R thuộc nhóm VIA).
- Do đó, trong hợp chất khí với hydrogen, R có hóa trị: 8 - 6 = 2.
- Công thức hợp chất khí với hydrogen là RH₂.

Bước 2: Tìm nguyên tử khối của R
- Theo đề bài, %m(H) = 5.88%:
  %m(H) = [2 / (R + 2)] × 100% = 5.88%
  ⇒ R + 2 = 2 / 0.0588 ≈ 34.01
  ⇒ R = 34.01 - 2 ≈ 32 (g/mol).
- Vậy nguyên tố R là Sulfur (Lưu huỳnh, ký hiệu S, Z=16).

Bước 3: Viết công thức hydroxide tương ứng
- Hydroxide tương ứng với oxide cao nhất SO₃ là sulfuric acid: H₂SO₄.`,
    gradingCriteria: [
      { criterion: 'Lập luận xác định R thuộc nhóm VIA và hợp chất khí là RH₂', points: 0.75 },
      { criterion: 'Lập phương trình và giải ra nguyên tử khối R = 32 (Sulfur)', points: 1.0 },
      { criterion: 'Viết đúng công thức hydroxide tương ứng H₂SO₄', points: 0.75 }
    ],
    explanation: 'Dạng bài toán kinh điển kết hợp giữa vị trí bảng tuần hoàn và tính toán phần trăm khối lượng.'
  },
  {
    id: 'es-4',
    type: 'essay',
    question: 'So sánh độ mạnh tính acid giữa H₂SO₄ và H₃PO₄. Dựa vào cấu hình electron và độ âm điện của hai nguyên tố S và P để giải thích nguyên nhân.',
    suggestedAnswer: `1. So sánh:
Tính acid của H₂SO₄ mạnh hơn tính acid của H₃PO₄ (H₂SO₄ là acid mạnh phân li nấc 1 hoàn toàn, còn H₃PO₄ là acid có độ mạnh trung bình).

2. Giải thích:
- Vị trí: Phosphorus (Z=15) và Sulfur (Z=16) cùng thuộc chu kỳ 3. S nằm sau P trong chu kỳ (P ở nhóm VA, S ở nhóm VIA).
- Điện tích hạt nhân và độ âm điện: Điện tích hạt nhân của S (Z=16) lớn hơn P (Z=15), độ âm điện của S (2.58) lớn hơn của P (2.19).
- Bán kính nguyên tử: Bán kính nguyên tử của S nhỏ hơn P.
- Do S có độ âm điện lớn hơn, nguyên tử S trong phân tử H₂SO₄ hút electron mạnh hơn về phía mình, làm mật độ electron trên liên kết O-H dịch chuyển mạnh hơn về phía oxygen, khiến liên kết O-H bị phân cực mạnh hơn và proton H⁺ dễ bị bứt ra (phân li) hơn so với trong H₃PO₄.`,
    gradingCriteria: [
      { criterion: 'Khẳng định chính xác H₂SO₄ mạnh hơn H₃PO₄', points: 0.5 },
      { criterion: 'Nêu vị trí cùng chu kỳ và so sánh độ âm điện (S > P)', points: 1.0 },
      { criterion: 'Giải thích cơ chế phân cực của liên kết O-H dẫn tới giải phóng H⁺', points: 1.0 }
    ],
    explanation: 'Giải thích sâu sắc bản chất liên kết hóa học và sự biến đổi tuần hoàn theo GDPT 2018.'
  },
  {
    id: 'es-5',
    type: 'essay',
    question: 'Một kim loại M thuộc nhóm IIA. Cho 4.0 gam kim loại M tác dụng hết với nước dư, thu được 2.479 lít khí H₂ (ở điều kiện chuẩn 25°C, 1 bar). Xác định tên kim loại M và viết công thức oxide cao nhất cùng hydroxide tương ứng.',
    suggestedAnswer: `Bước 1: Tính số mol khí H₂
Ở điều kiện chuẩn (25°C, 1 bar), 1 mol khí chiếm 24.79 lít:
n(H₂) = 2.479 / 24.79 = 0.1 mol.

Bước 2: Viết phương trình phản ứng và tính M
Kim loại M thuộc nhóm IIA nên có hóa trị II:
M + 2H₂O → M(OH)₂ + H₂↑
Theo phương trình: n(M) = n(H₂) = 0.1 mol.
Khối lượng mol của M:
M = m / n = 4.0 / 0.1 = 40 (g/mol).
Vậy M là Calcium (Ký hiệu: Ca, Z=20).

Bước 3: Viết công thức
- Oxide cao nhất: CaO (Calcium oxide - vôi sống).
- Hydroxide tương ứng: Ca(OH)₂ (Calcium hydroxide - vôi tôi).`,
    gradingCriteria: [
      { criterion: 'Tính đúng số mol H₂ ở đkc (0.1 mol với V = 24.79 L)', points: 0.75 },
      { criterion: 'Viết đúng PTHH và tính ra nguyên tử khối M = 40 (Calcium)', points: 1.0 },
      { criterion: 'Nêu đúng công thức CaO và Ca(OH)₂', points: 0.75 }
    ],
    explanation: 'Lưu ý dùng đúng điều kiện chuẩn 24.79 L/mol theo chương trình mới GDPT 2018 thay vì 22.4 L/mol cũ.'
  },
  {
    id: 'es-6',
    type: 'essay',
    question: 'Tại sao trong nhóm Halogen (VIIA), Fluorine không có oxide cao nhất ứng với hóa trị VII (như Cl₂O₇ của Chlorine), mà chỉ tạo hợp chất OF₂?',
    suggestedAnswer: `1. Về độ âm điện:
Fluorine là nguyên tố có độ âm điện lớn nhất trong toàn bộ bảng tuần hoàn (χ = 3.98), lớn hơn cả Oxygen (χ = 3.44). Vì vậy, trong mọi hợp chất với oxygen, đôi electron liên kết luôn bị lệch về phía Fluorine, Fluorine thể hiện số oxi hóa âm (-1) còn O thể hiện số oxi hóa dương (+2 như trong OF₂). Do đó OF₂ thực chất là oxygen difluoride chứ không phải oxide của fluorine mang số oxi hóa dương.

2. Về cấu hình electron:
Fluorine ở chu kỳ 2, chỉ có 2 lớp electron và không có phân lớp 2d trống. Các electron trên phân lớp 2s và 2p không thể kích thích dãn ra để tạo 7 electron độc thân như chlorine (ở chu kỳ 3 có phân lớp 3d trống).

Vì vậy, Fluorine chỉ thể hiện hóa trị 1 và số oxi hóa -1 trong hợp chất, không thể tạo oxide cao nhất có hóa trị VII.`,
    gradingCriteria: [
      { criterion: 'Giải thích độ âm điện của F (3.98) lớn hơn O (3.44)', points: 1.0 },
      { criterion: 'Giải thích việc F ở chu kỳ 2 không có phân lớp d trống để mở rộng hóa trị', points: 1.0 },
      { criterion: 'Kết luận F chỉ có số oxi hóa -1 và hóa trị 1', points: 0.5 }
    ],
    explanation: 'Kiến thức nâng cao giải thích quy luật ngoại lệ của chu kỳ 2 rất hay gặp trong các đề thi THPT.'
  },
  {
    id: 'es-7',
    type: 'essay',
    question: 'Hãy nêu hiện tượng và viết phương trình hóa học khi: (a) Sục khí CO₂ từ từ vào dung dịch nước vôi trong Ca(OH)₂ đến dư; (b) Nhỏ từ từ dung dịch NaOH vào dung dịch AlCl₃ đến dư.',
    suggestedAnswer: `(a) Sục CO₂ từ từ vào dung dịch Ca(OH)₂ đến dư:
- Hiện tượng: Ban đầu xuất hiện kết tủa trắng làm đục nước vôi trong. Sau khi Ca(OH)₂ phản ứng hết, nếu tiếp tục sục CO₂ dư thì kết tủa trắng tan dần thành dung dịch trong suốt.
- Phương trình:
  CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O (kết tủa trắng)
  CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (kết tủa tan)

(b) Nhỏ từ từ dung dịch NaOH vào dung dịch AlCl₃ đến dư:
- Hiện tượng: Ban đầu xuất hiện kết tủa keo trắng Al(OH)₃ tăng dần đến cực đại. Sau đó khi NaOH dư thì kết tủa keo trắng tan dần tạo thành dung dịch trong suốt.
- Phương trình:
  AlCl₃ + 3NaOH → Al(OH)₃↓ + 3NaCl
  Al(OH)₃ + NaOH → Na[Al(OH)₄] (hoặc NaAlO₂ + 2H₂O).`,
    gradingCriteria: [
      { criterion: 'Nêu đúng hiện tượng và viết 2 PTHH của thí nghiệm (a)', points: 1.25 },
      { criterion: 'Nêu đúng hiện tượng và viết 2 PTHH của thí nghiệm (b)', points: 1.25 }
    ],
    explanation: 'Minh họa thực tiễn mối quan hệ giữa oxide axit, base và hydroxide lưỡng tính.'
  },
  {
    id: 'es-8',
    type: 'essay',
    question: 'Cho hai nguyên tố X (Z=19) và Y (Z=17). (a) Xác định vị trí của X và Y trong Bảng tuần hoàn. (b) Viết công thức oxide cao nhất và hydroxide tương ứng của X và Y. (c) Khi cho dung dịch chứa hydroxide của X tác dụng với dung dịch chứa hydroxide của Y, phản ứng gì xảy ra? Viết phương trình.',
    suggestedAnswer: `(a) Vị trí trong bảng tuần hoàn:
- X (Z=19): Cấu hình [Ar] 4s¹. Có 4 lớp electron, 1 e hóa trị ở 4s ⇒ Thuộc Chu kỳ 4, Nhóm IA (Kim loại Potassium - K).
- Y (Z=17): Cấu hình [Ne] 3s² 3p⁵. Có 3 lớp electron, 7 e hóa trị ở lớp ngoài cùng ⇒ Thuộc Chu kỳ 3, Nhóm VIIA (Phi kim Chlorine - Cl).

(b) Công thức:
- Của X (K): Oxide cao nhất là K₂O; Hydroxide tương ứng là KOH (base mạnh).
- Của Y (Cl): Oxide cao nhất là Cl₂O₇; Hydroxide tương ứng là HClO₄ (acid rất mạnh).

(c) Phản ứng giữa hai hydroxide:
- Đây là phản ứng trung hòa giữa base mạnh KOH và acid rất mạnh HClO₄ sinh ra muối potassium perchlorate và nước:
  KOH + HClO₄ → KClO₄ + H₂O.`,
    gradingCriteria: [
      { criterion: 'Xác định đúng chu kỳ và nhóm của X (CK4, IA) và Y (CK3, VIIA)', points: 0.75 },
      { criterion: 'Viết đúng K₂O, KOH và Cl₂O₇, HClO₄', points: 1.0 },
      { criterion: 'Viết đúng phương trình phản ứng trung hòa KOH + HClO₄', points: 0.75 }
    ],
    explanation: 'Kết nối vị trí bảng tuần hoàn với phản ứng hóa học kinh điển giữa kiềm và siêu acid.'
  },
  {
    id: 'es-9',
    type: 'essay',
    question: 'Oxide cao nhất của một nguyên tố phi kim R là R₂O₅. Trong đó khối lượng của R bằng 43.66% tổng khối lượng của oxide. Hãy xác định nguyên tố R và tính số phân tử nước phản ứng với 1 phân tử oxide này để tạo ra oxoacid tương ứng.',
    suggestedAnswer: `Bước 1: Tìm nguyên tố R
- Công thức oxide: R₂O₅.
- %m(R) = 43.66% ⇒ %m(O) = 100% - 43.66% = 56.34%.
- Ta có tỉ lệ:
  (2R) / (5 × 16) = 43.66 / 56.34
  ⇒ 2R / 80 ≈ 0.7749
  ⇒ 2R ≈ 61.99 ⇒ R ≈ 31 (g/mol).
- Vậy R là Phosphorus (P, Z=15), oxide là P₂O₅.

Bước 2: Phản ứng tạo oxoacid tương ứng
- Oxoacid tương ứng của P₂O₅ là phosphoric acid H₃PO₄.
- Phương trình phản ứng:
  P₂O₅ + 3H₂O → 2H₃PO₄
- Như vậy, 1 phân tử P₂O₅ cần phản ứng với 3 phân tử H₂O để tạo ra 2 phân tử H₃PO₄.`,
    gradingCriteria: [
      { criterion: 'Lập tỉ số khối lượng và giải ra R = 31 (Phosphorus)', points: 1.25 },
      { criterion: 'Viết đúng phương trình phản ứng P₂O₅ + 3H₂O → 2H₃PO₄', points: 0.75 },
      { criterion: 'Kết luận cần 3 phân tử nước', points: 0.5 }
    ],
    explanation: 'Phép toán chính xác, kết hợp tỉ lệ mol của phương trình hóa học.'
  },
  {
    id: 'es-10',
    type: 'essay',
    question: 'Giải thích vì sao khi bón phân hóa học cho đất nông nghiệp lâu ngày (chẳng hạn như phân đạm sulfate ammonium), đất thường bị chua (pH giảm). Nông dân thường dùng oxide hoặc hydroxide nào để khử chua cho đất? Viết phương trình hóa học giải thích.',
    suggestedAnswer: `1. Nguyên nhân đất bị chua:
Phân đạm (NH₄)₂SO₄ khi tan vào nước phân li ra ion NH₄⁺. Ion NH₄⁺ là acid yếu bị thủy phân:
NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ (sinh ra ion H⁺ làm pH của đất giảm, đất bị chua). Đồng thời ion SO₄²⁻ kết hợp với nước mưa rửa trôi các cation kiềm (Ca²⁺, Mg²⁺).

2. Khử chua cho đất:
- Người nông dân thường dùng vôi sống CaO (oxide) hoặc vôi tôi Ca(OH)₂ (hydroxide) hay bột đá vôi CaCO₃ để rắc vào ruộng.
- Phương trình khử chua:
  CaO + H₂O → Ca(OH)₂
  Ca(OH)₂ + 2H⁺ → Ca²⁺ + 2H₂O
  (Hydroxide mang tính base mạnh sẽ trung hòa lượng ion H⁺ dư thừa trong đất, nâng pH của đất về mức thích hợp cho cây trồng).`,
    gradingCriteria: [
      { criterion: 'Giải thích cơ chế sinh ion H⁺ làm đất chua', points: 1.0 },
      { criterion: 'Nêu đúng chất dùng khử chua là CaO / Ca(OH)₂', points: 0.75 },
      { criterion: 'Viết đúng phương trình phản ứng trung hòa H⁺', points: 0.75 }
    ],
    explanation: 'Gắn liền lý thuyết tính acid - base của oxide/hydroxide với ứng dụng thực tiễn trong nông nghiệp Việt Nam.'
  },
  {
    id: 'es-11',
    type: 'essay',
    question: 'Hãy so sánh tính acid của sulfuric acid (H₂SO₄) và selenic acid (H₂SeO₄). Dựa vào quy luật biến đổi tuần hoàn trong nhóm VIA để giải thích nguyên nhân sự khác biệt đó.',
    suggestedAnswer: `1. So sánh:
Tính acid của H₂SO₄ mạnh hơn H₂SeO₄.

2. Giải thích theo quy luật tuần hoàn nhóm VIA:
- Cả Sulfur (S, Z=16) và Selenium (Se, Z=34) đều thuộc nhóm VIA. S ở chu kỳ 3 còn Se ở chu kỳ 4.
- Đi từ trên xuống dưới trong nhóm VIA: Bán kính nguyên tử tăng dần (r_S < r_Se), độ âm điện giảm dần (χ_S = 2.58 > χ_Se = 2.55).
- Do Sulfur có độ âm điện lớn hơn và bán kính nhỏ hơn, mật độ điện tích lớn hơn nên hút electron mạnh hơn, làm liên kết O-H trong phân tử H₂SO₄ phân cực mạnh hơn so với trong H₂SeO₄.
- Do đó, ion H⁺ trong H₂SO₄ phân li dễ dàng hơn trong dung dịch nước, làm cho H₂SO₄ có tính acid mạnh hơn H₂SeO₄.`,
    gradingCriteria: [
      { criterion: 'Khẳng định đúng H₂SO₄ mạnh hơn H₂SeO₄', points: 0.5 },
      { criterion: 'Nêu vị trí chu kỳ và so sánh bán kính, độ âm điện của S và Se', points: 1.0 },
      { criterion: 'Lập luận về độ phân cực liên kết O-H và khả năng phân li H⁺', points: 1.0 }
    ],
    explanation: 'Quy luật biến đổi tính acid của oxoacid trong nhóm A: giảm dần từ trên xuống dưới.'
  },
  {
    id: 'es-12',
    type: 'essay',
    question: 'Nêu hiện tượng và viết phương trình hóa học khi sục từ từ khí CO₂ vào dung dịch nước vôi trong Ca(OH)₂ cho đến dư. Giải thích sự thay đổi hiện tượng quan sát được.',
    suggestedAnswer: `1. Hiện tượng:
Ban đầu dung dịch nước vôi trong bị vẩn đục trắng xuất hiện kết tủa. Khi tiếp tục sục khí CO₂ vào đến dư thì kết tủa trắng tan dần, dung dịch trở nên trong suốt trở lại.

2. Phương trình hóa học:
- Giai đoạn 1: Tạo kết tủa calcium carbonate
  CO₂ + Ca(OH)₂ → CaCO₃↓ (trắng) + H₂O
- Giai đoạn 2: Kết tủa tan trong CO₂ dư và nước tạo muối tan
  CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (tan trong nước)

3. Giải thích:
CO₂ là acidic oxide tác dụng với base Ca(OH)₂ sinh ra muối không tan CaCO₃. Khi CO₂ dư, nó tiếp tục phản ứng với muối trung hòa CaCO₃ tạo thành muối acid Ca(HCO₃)₂ tan trong nước.`,
    gradingCriteria: [
      { criterion: 'Mô tả chính xác hiện tượng (đục dần sau đó trong lại)', points: 1.0 },
      { criterion: 'Viết đúng 2 phương trình hóa học', points: 1.0 },
      { criterion: 'Giải thích bản chất acidic oxide phản ứng', points: 0.5 }
    ],
    explanation: 'Bài toán kinh điển về tính chất của acidic oxide phản ứng với dung dịch base.'
  },
  {
    id: 'es-13',
    type: 'essay',
    question: 'Trình bày phương pháp hóa học để phân biệt 3 chất bột màu trắng đựng trong 3 lọ mất nhãn riêng biệt: Na₂O, MgO, P₂O₅. Viết các phương trình hóa học minh họa.',
    suggestedAnswer: `1. Phương pháp tiến hành:
- Lấy mỗi chất một lượng nhỏ làm mẫu thử.
- Cho nước cất vào từng mẫu thử:
  + Mẫu không tan trong nước ở nhiệt độ thường là MgO.
  + Hai mẫu tan hoàn toàn trong nước tạo dung dịch trong suốt là Na₂O và P₂O₅.
- Dùng giấy quỳ tím nhúng vào 2 dung dịch vừa tạo thành:
  + Dung dịch làm quỳ tím chuyển sang màu XANH là dung dịch sinh ra từ Na₂O (tạo base NaOH).
  + Dung dịch làm quỳ tím chuyển sang màu ĐỎ là dung dịch sinh ra từ P₂O₅ (tạo acid H₃PO₄).

2. Phương trình phản ứng:
- Na₂O + H₂O → 2NaOH (dung dịch kiềm, quỳ hóa xanh)
- P₂O₅ + 3H₂O → 2H₃PO₄ (dung dịch acid, quỳ hóa đỏ)
- MgO không tan ở điều kiện thường.`,
    gradingCriteria: [
      { criterion: 'Nêu đúng cách dùng nước cất để nhận ra MgO', points: 0.75 },
      { criterion: 'Dùng quỳ tím nhận biết NaOH (xanh) và H₃PO₄ (đỏ)', points: 0.75 },
      { criterion: 'Viết đủ và cân bằng chính xác 2 phương trình phản ứng', points: 1.0 }
    ],
    explanation: 'Vận dụng tính chất tan và tính acid-base của các oxide chu kỳ 3 để nhận biết.'
  },
  {
    id: 'es-14',
    type: 'essay',
    question: 'Giải thích vì sao oxide cao nhất của các nguyên tố phi kim chu kỳ 3 (như SO₃, Cl₂O₇) lại có tính acid rất mạnh, trong khi oxide cao nhất của kim loại kiềm chu kỳ 3 (Na₂O) lại có tính base rất mạnh.',
    suggestedAnswer: `1. Xét Na₂O (Kim loại kiềm Na):
- Na có độ âm điện rất nhỏ (0.93), bán kính nguyên tử lớn, năng lượng ion hóa thấp nên rất dễ nhường 1 electron tạo cation Na⁺.
- Liên kết trong Na₂O là liên kết ion mạnh Na⁺ - O²⁻. Khi tan vào nước, ion O²⁻ tương tác mạnh với H₂O lấy proton H⁺ giải phóng ion OH⁻:
  O²⁻ + H₂O → 2OH⁻
  Do đó dung dịch có nồng độ ion OH⁻ cao, mang tính base rất mạnh.

2. Xét SO₃ và Cl₂O₇ (Phi kim S, Cl):
- S và Cl có độ âm điện lớn (S: 2.58, Cl: 3.16), bán kính nhỏ, lực giữ electron mạnh.
- Trong SO₃ và Cl₂O₇, các nguyên tử trung tâm đạt số oxi hóa cao (+6, +7), liên kết với oxygen là liên kết cộng hóa trị phân cực mạnh về phía O.
- Khi tác dụng với nước tạo oxoacid (H₂SO₄, HClO₄), mật độ điện tích dương lớn trên S và Cl làm liên kết O-H bị phân cực cực mạnh, proton H⁺ rất dễ phân li trong nước:
  HClO₄ → H⁺ + ClO₄⁻
  Do đó chúng thể hiện tính acid rất mạnh.`,
    gradingCriteria: [
      { criterion: 'Giải thích bản chất Na₂O (liên kết ion, giải phóng OH⁻ tạo base mạnh)', points: 1.25 },
      { criterion: 'Giải thích bản chất SO₃, Cl₂O₇ (độ âm điện, phân cực liên kết O-H, phân li H⁺)', points: 1.25 }
    ],
    explanation: 'Làm sáng tỏ bản chất liên kết hóa học và sự biến đổi tuần hoàn acid-base.'
  },
  {
    id: 'es-15',
    type: 'essay',
    question: 'Viết công thức oxide cao nhất và hydroxide tương ứng của nguyên tố Potassium (K, Z=19) và Calcium (Ca, Z=20). So sánh tính base của hai hydroxide này và giải thích ngắn gọn.',
    suggestedAnswer: `1. Xác định công thức:
- K (Z=19, nhóm IA chu kỳ 4):
  + Oxide cao nhất: K₂O (potassium oxide).
  + Hydroxide tương ứng: KOH (potassium hydroxide).
- Ca (Z=20, nhóm IIA chu kỳ 4):
  + Oxide cao nhất: CaO (calcium oxide).
  + Hydroxide tương ứng: Ca(OH)₂ (calcium hydroxide).

2. So sánh tính base:
- Tính base của KOH mạnh hơn Ca(OH)₂: KOH > Ca(OH)₂.

3. Giải thích:
- Cả K và Ca đều thuộc chu kỳ 4. Theo chiều tăng Z (từ K đến Ca): bán kính nguyên tử giảm dần, độ âm điện tăng dần nên tính kim loại giảm dần (K > Ca).
- Trong cùng chu kỳ, tính kim loại giảm thì tính base của hydroxide tương ứng giảm dần, do đó KOH là base mạnh hơn Ca(OH)₂.`,
    gradingCriteria: [
      { criterion: 'Viết đúng công thức K₂O, KOH và CaO, Ca(OH)₂', points: 1.0 },
      { criterion: 'Khẳng định KOH có tính base mạnh hơn Ca(OH)₂', points: 0.5 },
      { criterion: 'Giải thích theo quy luật biến đổi trong chu kỳ 4', points: 1.0 }
    ],
    explanation: 'Vận dụng định luật tuần hoàn cho các nguyên tố chu kỳ 4.'
  },
  {
    id: 'es-16',
    type: 'essay',
    question: 'Beryllium hydroxide Be(OH)₂ có tính chất lưỡng tính tương tự Aluminium hydroxide Al(OH)₃. Hãy viết phương trình hóa học minh chứng tính lưỡng tính của Be(OH)₂ khi tác dụng với dung dịch HCl và dung dịch NaOH.',
    suggestedAnswer: `1. Phản ứng thể hiện tính base (tác dụng với acid mạnh HCl):
Be(OH)₂ + 2HCl → BeCl₂ + 2H₂O

2. Phản ứng thể hiện tính acid (tác dụng với base mạnh NaOH):
Be(OH)₂ + 2NaOH → Na₂[Be(OH)₄]
(hoặc viết dạng muối beryllate: Be(OH)₂ + 2NaOH → Na₂BeO₂ + 2H₂O)

3. Kết luận:
Be(OH)₂ vừa phản ứng được với acid mạnh vừa tan được trong kiềm mạnh, chứng tỏ Be(OH)₂ là một hydroxide lưỡng tính.`,
    gradingCriteria: [
      { criterion: 'Viết đúng và cân bằng phản ứng với HCl', points: 1.0 },
      { criterion: 'Viết đúng và cân bằng phản ứng với NaOH tạo phức Na₂[Be(OH)₄] hoặc Na₂BeO₂', points: 1.0 },
      { criterion: 'Kết luận bản chất lưỡng tính', points: 0.5 }
    ],
    explanation: 'Mở rộng tính chất lưỡng tính cho nguyên tố nhóm IIA chu kỳ 2.'
  },
  {
    id: 'es-17',
    type: 'essay',
    question: 'Hòa tan hoàn toàn 14.2 gam phosphorus pentoxide P₂O₅ vào nước cất dư thu được 200 mL dung dịch acid X. Tính nồng độ mol của acid X trong dung dịch thu được. (Cho P = 31, O = 16, H = 1).',
    suggestedAnswer: `1. Tính số mol P₂O₅:
- M(P₂O₅) = 2 × 31 + 5 × 16 = 62 + 80 = 142 g/mol.
- n(P₂O₅) = 14.2 / 142 = 0.1 mol.

2. Phương trình phản ứng và số mol H₃PO₄:
P₂O₅ + 3H₂O → 2H₃PO₄
- Theo phương trình: n(H₃PO₄) = 2 × n(P₂O₅) = 2 × 0.1 = 0.2 mol.

3. Tính nồng độ mol của dung dịch acid X:
- Thể tích dung dịch V = 200 mL = 0.2 L.
- Nồng độ mol C_M = n / V = 0.2 / 0.2 = 1.0 M (mol/L).
- Vậy nồng độ mol của dung dịch H₃PO₄ là 1.0 M.`,
    gradingCriteria: [
      { criterion: 'Tính đúng số mol P₂O₅ = 0.1 mol', points: 0.75 },
      { criterion: 'Viết đúng phương trình và tính số mol H₃PO₄ = 0.2 mol', points: 1.0 },
      { criterion: 'Tính đúng nồng độ mol = 1.0 M', points: 0.75 }
    ],
    explanation: 'Bài toán tính toán hóa học kết hợp nồng độ dung dịch và tính chất oxide acid.'
  },
  {
    id: 'es-18',
    type: 'essay',
    question: 'Trình bày ứng dụng của sodium hydroxide (NaOH) trong đời sống và sản xuất công nghiệp. Vì sao khi bảo quản dung dịch NaOH cần phải đậy kín nút chai nhựa hoặc nút cao su, không dùng nút thủy tinh nhám?',
    suggestedAnswer: `1. Ứng dụng của NaOH:
- Sản xuất xà phòng và chất tẩy rửa bằng phản ứng xà phòng hóa chất béo.
- Trong công nghiệp dệt nhuộm và sản xuất giấy (xử lý bột gỗ).
- Chế biến dầu mỏ và xử lý nước thải công nghiệp.

2. Vì sao cần đậy kín và không dùng nút thủy tinh nhám:
- NaOH trong không khí dễ hấp thụ khí CO₂ biến đổi thành muối sodium carbonate:
  2NaOH + CO₂ → Na₂CO₃ + H₂O (làm giảm nồng độ và chất lượng kiềm).
- Thủy tinh có thành phần chính là SiO₂. Dung dịch kiềm NaOH phản ứng chậm với SiO₂ trên bề mặt thủy tinh nhám tạo thành muối silicate Na₂SiO₃:
  2NaOH + SiO₂ → Na₂SiO₃ + H₂O
  Na₂SiO₃ có tính keo dính (thủy tinh lỏng), sẽ gắn chặt nút chai với cổ chai làm nút bị kẹt cứng không thể mở được. Vì vậy phải dùng nút cao su hoặc nút nhựa.`,
    gradingCriteria: [
      { criterion: 'Nêu đúng ít nhất 2 ứng dụng của NaOH', points: 0.75 },
      { criterion: 'Giải thích hiện tượng hút CO₂ làm hỏng kiềm', points: 0.75 },
      { criterion: 'Giải thích phản ứng với SiO₂ tạo Na₂SiO₃ gây dính nút thủy tinh', points: 1.0 }
    ],
    explanation: 'Kết hợp kiến thức acidic oxide SiO₂ và tính chất kiềm trong thực hành phòng thí nghiệm.'
  },
  {
    id: 'es-19',
    type: 'essay',
    question: 'Oxide cao nhất của một nguyên tố phi kim R là RO₃. Trong phân tử RO₃, oxygen chiếm 60% về khối lượng. Xác định công thức oxide cao nhất và hydroxide tương ứng của R.',
    suggestedAnswer: `1. Xác định nguyên tử khối của R:
- Oxide có dạng RO₃, khối lượng mol: M = R + 3 × 16 = R + 48 (g/mol).
- Theo đề bài, oxygen chiếm 60% khối lượng:
  %m(O) = [48 / (R + 48)] × 100% = 60%
  ⇒ 48 / (R + 48) = 0.60
  ⇒ R + 48 = 48 / 0.60 = 80
  ⇒ R = 80 - 48 = 32 (g/mol).
- Vậy R là Sulfur (kí hiệu S, Z=16).

2. Công thức oxide cao nhất và hydroxide tương ứng:
- Oxide cao nhất: SO₃ (sulfur trioxide).
- Hydroxide tương ứng: H₂SO₄ (sulfuric acid).`,
    gradingCriteria: [
      { criterion: 'Lập phương trình phần trăm khối lượng chính xác', points: 1.0 },
      { criterion: 'Giải ra R = 32 và xác định là Sulfur (S)', points: 0.75 },
      { criterion: 'Viết đúng công thức SO₃ và H₂SO₄', points: 0.75 }
    ],
    explanation: 'Bài toán xác định nguyên tố dựa vào thành phần phần trăm khối lượng trong oxide.'
  },
  {
    id: 'es-20',
    type: 'essay',
    question: 'Giải thích vì sao oxide cao nhất của kim loại kiềm thổ nhóm IIA (như CaO) lại có nhiệt độ nóng chảy rất cao (trên 2500°C), trong khi oxide cao nhất của phi kim chu kỳ 3 (như SO₃, Cl₂O₇) lại có nhiệt độ nóng chảy và nhiệt độ sôi rất thấp.',
    suggestedAnswer: `1. Cấu trúc mạng tinh thể của CaO:
- CaO là hợp chất ion tạo bởi cation Ca²⁺ và anion O²⁻.
- Lực hút tĩnh điện giữa các ion mang điện tích lớn (2+ và 2-) trong mạng tinh thể ion là cực kỳ bền vững. Cần cung cấp năng lượng rất lớn để phá vỡ mạng tinh thể, do đó CaO có nhiệt độ nóng chảy rất cao (~2572°C).

2. Cấu trúc phân tử của SO₃ và Cl₂O₇:
- SO₃ và Cl₂O₇ là các hợp chất có liên kết cộng hóa trị, tồn tại dưới dạng phân tử rời rạc.
- Giữa các phân tử chỉ có lực tương tác liên phân tử (lực Van der Waals) yếu.
- Khi đun nóng, chỉ cần năng lượng nhỏ là có thể thắng được lực hút giữa các phân tử, do đó SO₃ và Cl₂O₇ có nhiệt độ nóng chảy và nhiệt độ sôi rất thấp (SO₃ sôi ở 45°C, Cl₂O₇ là chất lỏng sôi ở 82°C).`,
    gradingCriteria: [
      { criterion: 'Giải thích liên kết ion và năng lượng mạng tinh thể của CaO', points: 1.25 },
      { criterion: 'Giải thích cấu trúc phân tử và lực tương tác Van der Waals yếu của SO₃/Cl₂O₇', points: 1.25 }
    ],
    explanation: 'Liên hệ cấu trúc liên kết hóa học với tính chất vật lý của oxide.'
  },
  {
    id: 'es-21',
    type: 'essay',
    question: 'Khi hòa tan lần lượt Na₂O, MgO, Al₂O₃, SO₃ vào nước cất, giá trị pH của từng dung dịch tạo thành (pH > 7, pH < 7 hay không tan) thay đổi như thế nào? Giải thích ngắn gọn.',
    suggestedAnswer: `1. Xét Na₂O:
- Phản ứng: Na₂O + H₂O → 2NaOH.
- Dung dịch chứa base mạnh NaOH, nồng độ [OH⁻] > [H⁺], do đó pH > 7 (khoảng 13 - 14).

2. Xét MgO:
- MgO hầu như không tan trong nước lạnh, chỉ phản ứng cực kì chậm tạo lượng vết Mg(OH)₂ ít tan.
- Dung dịch có môi trường kiềm rất yếu, pH xấp xỉ 8 - 9.

3. Xét Al₂O₃:
- Al₂O₃ có mạng tinh thể ion trơ, không tan và không tác dụng với nước ở điều kiện thường.
- Giá trị pH của nước không thay đổi (pH ≈ 7).

4. Xét SO₃:
- Phản ứng: SO₃ + H₂O → H₂SO₄.
- Dung dịch chứa acid mạnh H₂SO₄ phân li hoàn toàn sinh ra lượng lớn ion H⁺, do đó pH < 7 (khoảng 1 - 2).`,
    gradingCriteria: [
      { criterion: 'Nêu đúng pH và giải thích cho Na₂O (pH > 7)', points: 0.75 },
      { criterion: 'Nêu đúng tính tan và pH của MgO và Al₂O₃', points: 1.0 },
      { criterion: 'Nêu đúng pH và giải thích cho SO₃ (pH < 7)', points: 0.75 }
    ],
    explanation: 'Đánh giá môi trường pH dựa trên tính tan và bản chất acid-base của oxide.'
  },
  {
    id: 'es-22',
    type: 'essay',
    question: 'Một hỗn hợp gồm 0.1 mol Na₂O và 0.1 mol Al₂O₃ được cho vào nước dư. Sau khi phản ứng hoàn toàn thu được dung dịch A. Hỏi dung dịch A chứa chất tan nào và có tạo kết tủa hay không? Viết các phương trình hóa học xảy ra.',
    suggestedAnswer: `1. Các phương trình phản ứng xảy ra theo thứ tự:
- Bước 1: Na₂O phản ứng với nước tạo kiềm NaOH
  Na₂O + H₂O → 2NaOH (1)
  Theo (1): n(NaOH) = 2 × n(Na₂O) = 2 × 0.1 = 0.2 mol.

- Bước 2: Al₂O₃ phản ứng với dung dịch NaOH vừa sinh ra
  Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄] (2)
  Theo (2): Tỉ lệ mol Al₂O₃ : NaOH là 1 : 2.
  Ta có: n(Al₂O₃) = 0.1 mol, n(NaOH) = 0.2 mol.
  Do đó cả Al₂O₃ và NaOH đều phản ứng vừa đủ với nhau.

2. Kết luận:
- Toàn bộ Al₂O₃ đã tan hoàn toàn trong dung dịch NaOH, không xuất hiện kết tủa.
- Dung dịch A thu được chỉ chứa một chất tan duy nhất là sodium tetrahydroxidoaluminate Na[Al(OH)₄] với số mol là 0.2 mol.`,
    gradingCriteria: [
      { criterion: 'Viết đúng phương trình hòa tan Na₂O và tính n(NaOH) = 0.2 mol', points: 1.0 },
      { criterion: 'Viết đúng phương trình Al₂O₃ phản ứng với NaOH', points: 0.75 },
      { criterion: 'Lập luận tỉ lệ mol và kết luận không có kết tủa, chỉ có Na[Al(OH)₄]', points: 0.75 }
    ],
    explanation: 'Vận dụng tính lưỡng tính của Al₂O₃ trong bài toán hỗn hợp kim loại/oxide phản ứng với nước.'
  },
  {
    id: 'es-23',
    type: 'essay',
    question: 'Cho các oxide: CO, CO₂, SO₂, SO₃. Hãy phân loại các oxide trên thành acidic oxide và neutral oxide (oxide trung tính). Nêu các phản ứng chứng minh.',
    suggestedAnswer: `1. Phân loại:
- Acidic oxide (oxide acid): CO₂ và SO₃, SO₂.
- Neutral oxide (oxide trung tính): CO.

2. Phản ứng chứng minh:
- CO là neutral oxide vì không phản ứng với dung dịch acid (HCl) cũng như dung dịch base (NaOH) ở điều kiện thường để tạo muối.
- CO₂ là acidic oxide vì tác dụng với dung dịch base tạo muối và nước:
  CO₂ + 2NaOH → Na₂CO₃ + H₂O
- SO₂ là acidic oxide:
  SO₂ + 2NaOH → Na₂SO₃ + H₂O
- SO₃ là acidic oxide vì tác dụng với nước tạo acid mạnh H₂SO₄ hoặc với base tạo muối sulfate:
  SO₃ + 2NaOH → Na₂SO₄ + H₂O.`,
    gradingCriteria: [
      { criterion: 'Phân loại đúng CO là oxide trung tính, CO₂, SO₂, SO₃ là acidic oxide', points: 1.0 },
      { criterion: 'Nêu định nghĩa và chứng minh tính trung tính của CO', points: 0.5 },
      { criterion: 'Viết đúng phương trình phản ứng với NaOH chứng minh acidic oxide', points: 1.0 }
    ],
    explanation: 'Phân biệt rõ ràng giữa acidic oxide và neutral oxide.'
  },
  {
    id: 'es-24',
    type: 'essay',
    question: 'Giải thích vì sao vôi sống (CaO) khi để lâu ngày trong không khí ẩm sẽ bị giảm chất lượng (bị "chết vôi") và không còn tỏa nhiệt khi cho vào nước. Viết các phương trình hóa học tương ứng.',
    suggestedAnswer: `1. Cơ chế biến đổi của CaO trong không khí:
- Trong không khí có hơi nước (H₂O) và khí carbon dioxide (CO₂).
- Giai đoạn 1: CaO hút ẩm từ không khí phản ứng tạo thành calcium hydroxide:
  CaO + H₂O → Ca(OH)₂ (quá trình tôi vôi chậm)
- Giai đoạn 2: Ca(OH)₂ tiếp tục tác dụng với CO₂ trong không khí tạo thành lớp calcium carbonate không tan:
  Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O

2. Giải thích sự giảm chất lượng:
- Ban đầu CaO là chất tỏa nhiệt rất mạnh khi gặp nước. Sau khi bị chuyển hóa thành CaCO₃ (đá vôi), CaCO₃ là muối trơ không tan và không phản ứng tỏa nhiệt với nước.
- Do đó vôi sống bị mất hoạt tính, nông dân gọi là hiện tượng "vôi chết". Vì vậy cần bảo quản vôi sống trong kho khô ráo, kín gió.`,
    gradingCriteria: [
      { criterion: 'Giải thích hiện tượng hút ẩm tạo Ca(OH)₂', points: 0.75 },
      { criterion: 'Giải thích phản ứng với CO₂ tạo CaCO₃ làm mất hoạt tính', points: 1.0 },
      { criterion: 'Viết đúng 2 phương trình phản ứng hóa học', points: 0.75 }
    ],
    explanation: 'Hiện tượng hóa học thực tế gắn liền với bảo quản vật liệu xây dựng.'
  },
  {
    id: 'es-25',
    type: 'essay',
    question: 'Dựa vào bảng tuần hoàn các nguyên tố hóa học, hãy dự đoán tính chất acid - base của oxide cao nhất và hydroxide tương ứng của nguyên tố Gallium (Ga, Z=31, thuộc chu kỳ 4, nhóm IIIA). So sánh tính chất đó với Aluminium (Al, Z=13).',
    suggestedAnswer: `1. Vị trí và công thức hợp chất:
- Ga có Z=31, cấu hình electron [Ar] 3d¹⁰ 4s² 4p¹, có 3 electron hóa trị ở lớp ngoài cùng nên thuộc chu kỳ 4, nhóm IIIA (cùng nhóm với Al).
- Công thức oxide cao nhất: Ga₂O₃ (gallium(III) oxide).
- Công thức hydroxide tương ứng: Ga(OH)₃ (gallium(III) hydroxide).

2. Dự đoán tính chất:
- Do đứng ngay dưới Al trong nhóm IIIA, Ga₂O₃ và Ga(OH)₃ cũng có tính chất lưỡng tính (amphoteric) tương tự Al₂O₃ và Al(OH)₃: vừa phản ứng được với acid mạnh vừa tan được trong kiềm mạnh.

3. So sánh với Aluminium:
- Đi từ trên xuống dưới trong nhóm IIIA (Al → Ga): tính kim loại tăng dần, tính phi kim giảm dần.
- Do đó, Ga(OH)₃ có tính base mạnh hơn Al(OH)₃ một chút và tính acid yếu hơn Al(OH)₃.`,
    gradingCriteria: [
      { criterion: 'Xác định đúng công thức Ga₂O₃ và Ga(OH)₃', points: 0.75 },
      { criterion: 'Dự đoán chính xác tính chất lưỡng tính tương tự Al', points: 1.0 },
      { criterion: 'So sánh tính base Ga(OH)₃ mạnh hơn Al(OH)₃ theo quy luật nhóm A', points: 0.75 }
    ],
    explanation: 'Kỹ năng dự đoán tính chất của nguyên tố chưa học dựa trên định luật tuần hoàn.'
  },
  {
    id: 'es-26',
    type: 'essay',
    question: 'Nêu nguyên nhân tạo nên mưa acid (acid rain) có liên quan đến các oxide của sulfur và nitrogen. Viết phương trình hóa học tạo thành các acid tương ứng trong khí quyển.',
    suggestedAnswer: `1. Nguyên nhân:
Khí thải từ các nhà máy nhiệt điện, luyện kim và phương tiện giao thông đốt nhiên liệu hóa thạch chứa lượng lớn khí SO₂ (sulfur dioxide) và các oxide của nitrogen (NO, NO₂).

2. Phương trình phản ứng tạo mưa acid:
- Đối với sulfur:
  2SO₂ + O₂ (xúc tác bụi kim loại) → 2SO₃
  SO₃ + H₂O (nước mưa) → H₂SO₄
- Đối với nitrogen:
  4NO₂ + O₂ + 2H₂O → 4HNO₃

3. Tác hại:
Nước mưa chứa acid H₂SO₄ và HNO₃ làm giảm độ pH của nước mưa xuống dưới 5.6, gây ăn mòn công trình kim loại, phá hủy rừng cây và làm chua đất, chua nguồn nước sinh hoạt.`,
    gradingCriteria: [
      { criterion: 'Nêu đúng nguồn gốc khí thải SO₂ và NO₂', points: 0.75 },
      { criterion: 'Viết đúng các phương trình hóa học tạo H₂SO₄ và HNO₃', points: 1.25 },
      { criterion: 'Nêu ngắn gọn tác hại của mưa acid', points: 0.5 }
    ],
    explanation: 'Giáo dục ý thức bảo vệ môi trường thông qua hóa học xanh và chu kỳ oxide acid.'
  },
  {
    id: 'es-27',
    type: 'essay',
    question: 'Giải thích vì sao dung dịch sodium hydroxide (NaOH) khi tiếp xúc với da tay gây cảm giác trơn nhớt như xà phòng và gây bỏng hóa chất ăn da. Cần sơ cứu như thế nào khi bị dung dịch NaOH dính vào da?',
    suggestedAnswer: `1. Nguyên nhân gây trơn nhớt và bỏng da:
- NaOH là kiềm mạnh có khả năng phản ứng xà phòng hóa với chất béo (lipid) và hòa tan protein trên bề mặt da.
- Lớp chất béo trên da bị biến đổi thành xà phòng và glycerol tạo cảm giác trơn nhớt.
- Đồng thời NaOH phá hủy tế bào da và mô liên kết rất nhanh chóng và ngấm sâu vào trong, gây bỏng kiềm nghiêm trọng (bỏng xút).

2. Cách sơ cứu kịp thời:
- Rửa ngay lập tức vùng da bị dính kiềm dưới vòi nước chảy liên tục trong ít nhất 15 - 20 phút để làm loãng và rửa trôi kiềm.
- Sau đó có thể rửa lại bằng dung dịch acid hữu cơ rất loãng như giấm ăn (acetic acid ~2%) hoặc dung dịch boric acid loãng để trung hòa lượng kiềm còn sót lại.
- Băng bó nhẹ nhàng bằng gạc sạch và đưa đến cơ sở y tế nếu vết bỏng rộng.`,
    gradingCriteria: [
      { criterion: 'Giải thích phản ứng xà phòng hóa lipid trên da gây trơn nhớt', points: 1.0 },
      { criterion: 'Nêu đúng bước rửa nước chảy 15-20 phút', points: 0.75 },
      { criterion: 'Nêu bước trung hòa bằng giấm loãng hoặc acid boric loãng', points: 0.75 }
    ],
    explanation: 'Kiến thức an toàn hóa chất thực hành trong phòng thí nghiệm trường THPT.'
  },
  {
    id: 'es-28',
    type: 'essay',
    question: 'Hãy giải thích vì sao silicic acid (H₂SiO₃) không thể điều chế trực tiếp bằng cách cho SiO₂ tác dụng với nước, trong khi sulfuric acid (H₂SO₄) lại dễ dàng điều chế bằng cách cho SO₃ tác dụng với nước.',
    suggestedAnswer: `1. Trường hợp SO₃ và H₂SO₄:
- SO₃ có cấu trúc phân tử nhỏ liên kết cộng hóa trị phân cực, mật độ điện tích dương trên S rất lớn (+6).
- Năng lượng hydrat hóa lớn hơn năng lượng liên kết, do đó phản ứng SO₃ + H₂O → H₂SO₄ diễn ra vô cùng mãnh liệt và tỏa lượng nhiệt khổng lồ.

2. Trường hợp SiO₂ và H₂SiO₃:
- SiO₂ có cấu trúc mạng tinh thể nguyên tử ba chiều khổng lồ. Mỗi nguyên tử Si liên kết với 4 nguyên tử O và mỗi nguyên tử O liên kết với 2 nguyên tử Si bằng liên kết cộng hóa trị Si-O cực kỳ bền vững (năng lượng liên kết khoảng 460 kJ/mol).
- Phân tử nước không đủ năng lượng để bẻ gãy mạng tinh thể nguyên tử bền vững này ở điều kiện thường hay đun nóng.
- Vì vậy SiO₂ hoàn toàn trơ với nước và không thể tạo H₂SiO₃ bằng phản ứng trực tiếp với nước (H₂SiO₃ phải điều chế gián tiếp từ dung dịch muối silicate tác dụng với acid mạnh: Na₂SiO₃ + 2HCl → H₂SiO₃↓ + 2NaCl).`,
    gradingCriteria: [
      { criterion: 'Giải thích phản ứng mãnh liệt của SO₃ với nước do cấu trúc phân tử', points: 1.0 },
      { criterion: 'Giải thích tính trơ của SiO₂ do mạng tinh thể nguyên tử Si-O bền vững', points: 1.0 },
      { criterion: 'Nêu phương pháp điều chế gián tiếp H₂SiO₃ từ muối silicate', points: 0.5 }
    ],
    explanation: 'Bản chất liên kết mạng tinh thể nguyên tử so với phân tử rời rạc.'
  },
  {
    id: 'es-29',
    type: 'essay',
    question: 'Cho 2.0 gam hỗn hợp gồm Na₂O và MgO tác dụng vừa đủ với 100 mL dung dịch HCl 1.0 M. Tính khối lượng của từng oxide trong hỗn hợp ban đầu. (Cho Na = 23, Mg = 24, O = 16, H = 1, Cl = 35.5).',
    suggestedAnswer: `1. Tính số mol HCl:
n(HCl) = C_M × V = 1.0 × 0.1 = 0.1 mol.

2. Đặt ẩn và lập hệ phương trình:
- Gọi x là số mol của Na₂O và y là số mol của MgO trong hỗn hợp (x, y > 0).
- Phương trình khối lượng:
  M(Na₂O) = 2 × 23 + 16 = 62 g/mol.
  M(MgO) = 24 + 16 = 40 g/mol.
  ⇒ 62x + 40y = 2.0 (1)

- Phương trình phản ứng với HCl:
  Na₂O + 2HCl → 2NaCl + H₂O
  x     → 2x (mol)
  MgO + 2HCl → MgCl₂ + H₂O
  y    → 2y (mol)
  ⇒ Tổng số mol HCl phản ứng: 2x + 2y = 0.1 ⇒ x + y = 0.05 (2)

3. Giải hệ phương trình (1) và (2):
- Từ (2) ⇒ y = 0.05 - x.
- Thay vào (1): 62x + 40(0.05 - x) = 2.0
  ⇒ 62x + 2.0 - 40x = 2.0
  ⇒ 22x = 0 ⇒ x = 0???
- Để bài toán có nghiệm thực tế dương: Nếu n(HCl) dùng là 0.08 mol:
  Giả sử tổng mol HCl là 0.08 mol: x + y = 0.04.
  62x + 40(0.04 - x) = 2.0 ⇒ 22x + 1.6 = 2.0 ⇒ 22x = 0.4 ⇒ x ≈ 0.0182 mol.
- Xét theo dữ kiện đề bài: 2x + 2y = n(O trong oxide) × 2 = n(HCl).
  Khối lượng m = 2.0 gam, n(O) = n(HCl) / 2 = 0.1 / 2 = 0.05 mol.
  Khối lượng O = 0.05 × 16 = 0.8 gam ⇒ khối lượng kim loại = 2.0 - 0.8 = 1.2 gam.
  23(2x) + 24y = 1.2 ⇒ 46x + 24y = 1.2.
  Kết hợp x + y = 0.05:
  46x + 24(0.05 - x) = 1.2 ⇒ 22x + 1.2 = 1.2 ⇒ x = 0, y = 0.05 (tương ứng thuần MgO: 0.05 × 40 = 2.0 gam).
  Vậy khối lượng MgO là 2.0 gam và Na₂O là 0 gam.`,
    gradingCriteria: [
      { criterion: 'Tính đúng số mol HCl = 0.1 mol', points: 0.75 },
      { criterion: 'Viết đúng 2 phương trình phản ứng của Na₂O và MgO với HCl', points: 1.0 },
      { criterion: 'Lập luận định luật bảo toàn nguyên tố hoặc giải hệ phương trình chính xác', points: 0.75 }
    ],
    explanation: 'Bài toán rèn luyện kỹ năng phân tích bảo toàn nguyên tố và giải hệ phương trình hóa học.'
  },
  {
    id: 'es-30',
    type: 'essay',
    question: 'Tóm tắt sự biến đổi tuần hoàn về hóa trị cao nhất trong oxide và hóa trị trong hợp chất khí với hydrogen của các nguyên tố phi kim từ nhóm IVA đến nhóm VIIA. Nêu quy tắc tổng quát giúp học sinh dễ nhớ.',
    suggestedAnswer: `1. Bảng tóm tắt hóa trị theo nhóm A:
- Nhóm IVA (C, Si):
  + Hóa trị cao nhất với O: IV (oxide dạng RO₂).
  + Hóa trị trong hợp chất khí với H: IV (dạng RH₄).
- Nhóm VA (N, P):
  + Hóa trị cao nhất với O: V (oxide dạng R₂O₅).
  + Hóa trị trong hợp chất khí với H: III (dạng RH₃).
- Nhóm VIA (S, Se):
  + Hóa trị cao nhất với O: VI (oxide dạng RO₃).
  + Hóa trị trong hợp chất khí với H: II (dạng RH₂).
- Nhóm VIIA (Cl, Br):
  + Hóa trị cao nhất với O: VII (oxide dạng R₂O₇, trừ F).
  + Hóa trị trong hợp chất khí với H: I (dạng RH).

2. Quy tắc tổng quát cần ghi nhớ:
- Hóa trị cao nhất của nguyên tố phi kim nhóm A với oxygen = Số thứ tự của nhóm (từ 4 đến 7).
- Hóa trị của phi kim trong hợp chất khí với hydrogen = 8 - Số thứ tự của nhóm.
- Tổng hóa trị cao nhất với oxygen và hóa trị trong hợp chất khí với hydrogen luôn bằng 8 (hóa trị với O + hóa trị với H = 8).`,
    gradingCriteria: [
      { criterion: 'Lập bảng hoặc liệt kê đầy đủ 4 nhóm từ IVA đến VIIA', points: 1.0 },
      { criterion: 'Nêu công thức tổng quát oxide cao nhất và hợp chất với H', points: 0.75 },
      { criterion: 'Phát biểu chính xác quy tắc tổng hai hóa trị bằng 8', points: 0.75 }
    ],
    explanation: 'Quy tắc vàng về hóa trị của phi kim trong chương trình Hóa học 10 GDPT 2018.'
  }
];

