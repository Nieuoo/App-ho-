import { ChemicalElement, ElementCategory } from '../types/chemistry';

export const CATEGORY_LABELS: Record<ElementCategory, { label: string; color: string; desc: string }> = {
  'alkali-metal': {
    label: 'Kim loại kiềm (Nhóm IA)',
    color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    desc: 'Kim loại rất hoạt động, tạo basic oxide mạnh và dung dịch kiềm mạnh R(OH)',
  },
  'alkaline-earth': {
    label: 'Kim loại kiềm thổ (Nhóm IIA)',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    desc: 'Kim loại hoạt động, tạo basic oxide RO và hydroxide R(OH)₂',
  },
  'transition-metal': {
    label: 'Kim loại chuyển tiếp (Nhóm B)',
    color: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    desc: 'Các nguyên tố khối d, có nhiều số oxi hóa, tạo oxide/hydroxide đa dạng',
  },
  'post-transition-metal': {
    label: 'Kim loại yếu (Hậu chuyển tiếp)',
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    desc: 'Tính kim loại giảm dần, Al₂O₃ và Al(OH)₃ có tính lưỡng tính điển hình',
  },
  'metalloid': {
    label: 'Á kim (Bán kim)',
    color: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    desc: 'Mang tính chất trung gian giữa kim loại và phi kim (B, Si, Ge, As, Sb, Te)',
  },
  'reactive-nonmetal': {
    label: 'Phi kim hoạt động',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    desc: 'Tạo acidic oxide và oxoacid tương ứng (C, N, O, P, S, Se)',
  },
  'halogen': {
    label: 'Halogen (Nhóm VIIA)',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    desc: 'Phi kim rất mạnh, tạo oxide cao nhất Cl₂O₇ và acid rất mạnh như HClO₄',
  },
  'noble-gas': {
    label: 'Khí hiếm (Nhóm VIIIA)',
    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    desc: 'Cấu hình bền vững ns²np⁶, trơ về mặt hóa học ở điều kiện thường',
  },
  'lanthanide': {
    label: 'Họ Lantan (Lanthanides)',
    color: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    desc: 'Các nguyên tố đất hiếm khối 4f, từ Lanthanum (57) đến Lutetium (71)',
  },
  'actinide': {
    label: 'Họ Actini (Actinides)',
    color: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    desc: 'Các nguyên tố phóng xạ khối 5f, từ Actinium (89) đến Lawrencium (103)',
  },
};

export const ELEMENTS: ChemicalElement[] = [
  // Period 1
  {
    z: 1, symbol: 'H', nameVi: 'Hydrogen', nameIupac: 'Hydrogen', atomicMass: 1.008, period: 1, group: 1, groupLabel: 'IA',
    category: 'reactive-nonmetal', electronConfig: '1s¹', electronegativity: 2.20, atomicRadius: 53,
    metallicCharacter: 'Phi kim', highestOxide: 'H₂O', oxideNature: 'Acidic oxide rất yếu',
    highestHydroxide: 'H₂O', hydroxideNature: 'Acid rất yếu',
    applications: 'Nhiên liệu sạch của tương lai, tổng hợp ammonia (NH₃), công nghiệp hóa dầu và khử quặng kim loại.',
    funFact: 'Nguyên tố phổ biến nhất trong vũ trụ, chiếm khoảng 75% tổng khối lượng vật chất thông thường.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 2, symbol: 'He', nameVi: 'Helium', nameIupac: 'Helium', atomicMass: 4.0026, period: 1, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '1s²', atomicRadius: 31,
    metallicCharacter: 'Khí hiếm', highestOxide: 'Không có', oxideNature: 'Trơ',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Khí làm mát nam châm siêu dẫn trong máy chụp cộng hưởng từ MRI, khí cầu thám không.',
    funFact: 'Là nguyên tố duy nhất trên Trái Đất được phát hiện trên Mặt Trời trước khi tìm thấy trong lòng đất.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 2
  {
    z: 3, symbol: 'Li', nameVi: 'Lithium', nameIupac: 'Lithium', atomicMass: 6.94, period: 2, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[He] 2s¹', electronegativity: 0.98, atomicRadius: 167,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'Li₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'LiOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Pin lithium-ion cho điện thoại thông minh, xe điện Tesla, thuốc điều trị rối loạn lưỡng cực.',
    funFact: 'Kim loại nhẹ nhất có khối lượng riêng xấp xỉ 0.534 g/cm³, nổi trên mặt dầu khoáng và nước.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 4, symbol: 'Be', nameVi: 'Beryllium', nameIupac: 'Beryllium', atomicMass: 9.0122, period: 2, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[He] 2s²', electronegativity: 1.57, atomicRadius: 112,
    metallicCharacter: 'Kim loại', highestOxide: 'BeO', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Be(OH)₂', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Hợp kim nhẹ chịu nhiệt trong tàu vũ trụ, kính viễn vọng không gian James Webb.',
    funFact: 'Hợp chất của Beryllium có vị ngọt nên từng được gọi là Glucinium, nhưng các hợp chất này lại rất độc.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  {
    z: 5, symbol: 'B', nameVi: 'Boron', nameIupac: 'Boron', atomicMass: 10.81, period: 2, group: 13, groupLabel: 'IIIA',
    category: 'metalloid', electronConfig: '[He] 2s² 2p¹', electronegativity: 2.04, atomicRadius: 87,
    metallicCharacter: 'Á kim', highestOxide: 'B₂O₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₃BO₃', hydroxideNature: 'Acid rất yếu',
    applications: 'Thủy tinh chịu nhiệt Pyrex, gốm sứ kỹ thuật cao, chất bán dẫn p-type.',
    funFact: 'Hợp chất Boron nitride có cấu trúc tinh thể tương tự kim cương và độ cứng gần như tương đương.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 6, symbol: 'C', nameVi: 'Carbon', nameIupac: 'Carbon', atomicMass: 12.011, period: 2, group: 14, groupLabel: 'IVA',
    category: 'reactive-nonmetal', electronConfig: '[He] 2s² 2p²', electronegativity: 2.55, atomicRadius: 67,
    metallicCharacter: 'Phi kim', highestOxide: 'CO₂', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₂CO₃', hydroxideNature: 'Acid rất yếu',
    applications: 'Nền tảng của sự sống hữu cơ, vật liệu nano carbon graphene, kim cương trang sức, than chì.',
    funFact: 'Graphene (lớp carbon dày 1 nguyên tử) dẫn điện tốt hơn đồng và bền gấp 200 lần thép.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 7, symbol: 'N', nameVi: 'Nitrogen', nameIupac: 'Nitrogen', atomicMass: 14.007, period: 2, group: 15, groupLabel: 'VA',
    category: 'reactive-nonmetal', electronConfig: '[He] 2s² 2p³', electronegativity: 3.04, atomicRadius: 56,
    metallicCharacter: 'Phi kim', highestOxide: 'N₂O₅', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'HNO₃', hydroxideNature: 'Acid mạnh',
    applications: 'Sản xuất phân bón đạm urê, thuốc nổ, bảo quản mẫu sinh học lạnh sâu bằng N₂ lỏng.',
    funFact: 'Chiếm đến 78.1% thể tích bầu khí quyển Trái Đất, phân tử N₂ có liên kết ba cực kỳ bền vững.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 8, symbol: 'O', nameVi: 'Oxygen', nameIupac: 'Oxygen', atomicMass: 15.999, period: 2, group: 16, groupLabel: 'VIA',
    category: 'reactive-nonmetal', electronConfig: '[He] 2s² 2p⁴', electronegativity: 3.44, atomicRadius: 48,
    metallicCharacter: 'Phi kim mạnh', highestOxide: 'OF₂ (chất oxy hóa)', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₂O', hydroxideNature: 'Acid rất yếu',
    applications: 'Duy trì sự hô hấp của sinh vật, khí oxy y tế, quá trình đốt cháy và luyện kim.',
    funFact: 'Oxy lỏng có màu xanh lam nhạt và có tính thuận từ (bị nam châm hút nhẹ).',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 9, symbol: 'F', nameVi: 'Fluorine', nameIupac: 'Fluorine', atomicMass: 18.998, period: 2, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[He] 2s² 2p⁵', electronegativity: 3.98, atomicRadius: 42,
    metallicCharacter: 'Phi kim mạnh', highestOxide: 'OF₂', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HOF', hydroxideNature: 'Acid rất yếu',
    applications: 'Chất phủ chống dính Teflon (PTFE), chất làm lạnh, fluoride ngừa sâu răng trong kem đánh răng.',
    funFact: 'Nguyên tố có độ âm điện lớn nhất (3.98), có tính oxi hóa mạnh nhất trong toàn bộ bảng tuần hoàn.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 10, symbol: 'Ne', nameVi: 'Neon', nameIupac: 'Neon', atomicMass: 20.180, period: 2, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[He] 2s² 2p⁶', atomicRadius: 38,
    metallicCharacter: 'Khí hiếm', highestOxide: 'Không có', oxideNature: 'Trơ',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Đèn neon quảng cáo màu đỏ cam rực rỡ, laser khí helium-neon trong quang học.',
    funFact: 'Phát ra ánh sáng màu đỏ cam đặc trưng khi có dòng điện cao áp phóng qua ở áp suất thấp.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 3 (TRỌNG TÂM GDPT 2018 - CHUYÊN ĐỀ OXIDE & HYDROXIDE)
  {
    z: 11, symbol: 'Na', nameVi: 'Sodium', nameIupac: 'Sodium', atomicMass: 22.990, period: 3, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[Ne] 3s¹', electronegativity: 0.93, atomicRadius: 190,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'Na₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'NaOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Sản xuất muối ăn (NaCl), xà phòng, dung dịch kiềm NaOH công nghiệp, đèn hơi natri.',
    funFact: 'Phản ứng mãnh liệt với nước sinh ra khí H₂ và làm bốc cháy với ngọn lửa màu vàng rực rỡ.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 12, symbol: 'Mg', nameVi: 'Magnesium', nameIupac: 'Magnesium', atomicMass: 24.305, period: 3, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[Ne] 3s²', electronegativity: 1.31, atomicRadius: 145,
    metallicCharacter: 'Kim loại', highestOxide: 'MgO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Mg(OH)₂', hydroxideNature: 'Base trung bình/yếu',
    applications: 'Hợp kim siêu nhẹ cho hàng không vũ trụ, pháo hoa sáng chói, thuốc kháng acid dạ dày.',
    funFact: 'Là tâm của phân tử diệp lục (chlorophyll), giúp cây xanh quang hợp dưới ánh sáng mặt trời.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  {
    z: 13, symbol: 'Al', nameVi: 'Aluminium', nameIupac: 'Aluminium', atomicMass: 26.982, period: 3, group: 13, groupLabel: 'IIIA',
    category: 'post-transition-metal', electronConfig: '[Ne] 3s² 3p¹', electronegativity: 1.61, atomicRadius: 118,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Al₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Al(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Vỏ máy bay, dây dẫn điện cao thế, vật liệu xây dựng, đá quý ruby và sapphire (Al₂O₃ pha tạp).',
    funFact: 'Al₂O₃ và Al(OH)₃ đều có tính lưỡng tính: tan cả trong dung dịch acid mạnh và base mạnh.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 14, symbol: 'Si', nameVi: 'Silicon', nameIupac: 'Silicon', atomicMass: 28.085, period: 3, group: 14, groupLabel: 'IVA',
    category: 'metalloid', electronConfig: '[Ne] 3s² 3p²', electronegativity: 1.90, atomicRadius: 111,
    metallicCharacter: 'Á kim', highestOxide: 'SiO₂', oxideNature: 'Acidic oxide rất yếu',
    highestHydroxide: 'H₂SiO₃', hydroxideNature: 'Acid rất yếu',
    applications: 'Trái tim của cuộc cách mạng công nghệ số: chip vi xử lý bán dẫn, pin mặt trời, thủy tinh cát.',
    funFact: 'Chiếm gần 28% khối lượng vỏ Trái Đất (đứng thứ 2 sau Oxy), thạch anh chính là tinh thể SiO₂ tinh khiết.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 15, symbol: 'P', nameVi: 'Phosphorus', nameIupac: 'Phosphorus', atomicMass: 30.974, period: 3, group: 15, groupLabel: 'VA',
    category: 'reactive-nonmetal', electronConfig: '[Ne] 3s² 3p³', electronegativity: 2.19, atomicRadius: 98,
    metallicCharacter: 'Phi kim', highestOxide: 'P₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₃PO₄', hydroxideNature: 'Acid trung bình',
    applications: 'Sản xuất phân lân (superphosphate), diêm quẹt, xương và răng của động vật có vú, DNA & RNA.',
    funFact: 'Phosphorus trắng phát quang trong bóng tối và tự bốc cháy ở 30°C trong không khí, nên phải ngâm dưới nước.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 16, symbol: 'S', nameVi: 'Sulfur', nameIupac: 'Sulfur', atomicMass: 32.06, period: 3, group: 16, groupLabel: 'VIA',
    category: 'reactive-nonmetal', electronConfig: '[Ne] 3s² 3p⁴', electronegativity: 2.58, atomicRadius: 88,
    metallicCharacter: 'Phi kim', highestOxide: 'SO₃', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'H₂SO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Sản xuất acid sulfuric H₂SO₄ (hóa chất công nghiệp quan trọng bậc nhất thế giới), lưu hóa cao su.',
    funFact: 'H₂SO₄ có tính háu nước cực mạnh, có thể than hóa đường ăn saccarozơ chỉ trong vài giây.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 17, symbol: 'Cl', nameVi: 'Chlorine', nameIupac: 'Chlorine', atomicMass: 35.45, period: 3, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[Ne] 3s² 3p⁵', electronegativity: 3.16, atomicRadius: 79,
    metallicCharacter: 'Phi kim mạnh', highestOxide: 'Cl₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HClO₄', hydroxideNature: 'Acid rất mạnh',
    applications: 'Khử trùng nước sinh hoạt và hồ bơi, sản xuất nhựa PVC, chất tẩy trắng vải sợi và giấy.',
    funFact: 'Perchloric acid (HClO₄) là một trong những siêu acid vô cơ mạnh nhất trong hóa học cổ điển.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 18, symbol: 'Ar', nameVi: 'Argon', nameIupac: 'Argon', atomicMass: 39.948, period: 3, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[Ne] 3s² 3p⁶', atomicRadius: 71,
    metallicCharacter: 'Khí hiếm', highestOxide: 'Không có', oxideNature: 'Trơ',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Khí bảo vệ trong công nghệ hàn kim loại TIG/MIG, đèn sợi đốt, cửa kính cách âm cách nhiệt.',
    funFact: 'Tên gọi xuất phát từ tiếng Hy Lạp "argos" nghĩa là "lười biếng" do tính chất hoàn toàn trơ hóa học.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 4
  {
    z: 19, symbol: 'K', nameVi: 'Potassium', nameIupac: 'Potassium', atomicMass: 39.098, period: 4, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[Ar] 4s¹', electronegativity: 0.82, atomicRadius: 243,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'K₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'KOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Phân kali cho cây trồng, sản xuất xà phòng mềm KOH, tế bào pin kiềm.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 20, symbol: 'Ca', nameVi: 'Calcium', nameIupac: 'Calcium', atomicMass: 40.078, period: 4, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[Ar] 4s²', electronegativity: 1.00, atomicRadius: 194,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'CaO', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'Ca(OH)₂', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Vôi sống CaO và vôi tôi Ca(OH)₂ trong xây dựng, xi măng, thành phần cấu tạo xương.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  {
    z: 21, symbol: 'Sc', nameVi: 'Scandium', nameIupac: 'Scandium', atomicMass: 44.956, period: 4, group: 3, groupLabel: 'IIIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d¹ 4s²', electronegativity: 1.36, atomicRadius: 184,
    metallicCharacter: 'Kim loại', highestOxide: 'Sc₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Sc(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Hợp kim nhôm-scandium cho khung máy bay chiến đấu phản lực và gậy đánh bóng chày.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 22, symbol: 'Ti', nameVi: 'Titanium', nameIupac: 'Titanium', atomicMass: 47.867, period: 4, group: 4, groupLabel: 'IVB',
    category: 'transition-metal', electronConfig: '[Ar] 3d² 4s²', electronegativity: 1.54, atomicRadius: 176,
    metallicCharacter: 'Kim loại', highestOxide: 'TiO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Ti(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Kim loại siêu bền trong khớp nối y tế, vỏ máy bay siêu âm, TiO₂ làm bột màu trắng siêu bền.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 23, symbol: 'V', nameVi: 'Vanadium', nameIupac: 'Vanadium', atomicMass: 50.942, period: 4, group: 5, groupLabel: 'VB',
    category: 'transition-metal', electronConfig: '[Ar] 3d³ 4s²', electronegativity: 1.63, atomicRadius: 171,
    metallicCharacter: 'Kim loại', highestOxide: 'V₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HVO₃', hydroxideNature: 'Acid yếu',
    applications: 'Chất xúc tác V₂O₅ trong sản xuất H₂SO₄, thép vanadi siêu cứng làm cờ lê và giảm xóc xe.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 24, symbol: 'Cr', nameVi: 'Chromium', nameIupac: 'Chromium', atomicMass: 51.996, period: 4, group: 6, groupLabel: 'VIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d⁵ 4s¹', electronegativity: 1.66, atomicRadius: 166,
    metallicCharacter: 'Kim loại', highestOxide: 'CrO₃', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'H₂CrO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Thép không gỉ (Inox 18/8), mạ crôm bóng chống gỉ sét, hợp chất màu crôm rực rỡ.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 25, symbol: 'Mn', nameVi: 'Manganese', nameIupac: 'Manganese', atomicMass: 54.938, period: 4, group: 7, groupLabel: 'VIIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d⁵ 4s²', electronegativity: 1.55, atomicRadius: 161,
    metallicCharacter: 'Kim loại', highestOxide: 'Mn₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HMnO₄', hydroxideNature: 'Acid rất mạnh',
    applications: 'Khử oxy trong luyện thép, chất oxi hóa KMnO₄ (thuốc tím) trong khử trùng y tế.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 26, symbol: 'Fe', nameVi: 'Iron', nameIupac: 'Iron', atomicMass: 55.845, period: 4, group: 8, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d⁶ 4s²', electronegativity: 1.83, atomicRadius: 156,
    metallicCharacter: 'Kim loại', highestOxide: 'Fe₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Fe(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Kim loại quan trọng nhất của nền văn minh nhân loại (gang, thép), huyết sắc tố hemoglobin máu.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 27, symbol: 'Co', nameVi: 'Cobalt', nameIupac: 'Cobalt', atomicMass: 58.933, period: 4, group: 9, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d⁷ 4s²', electronegativity: 1.88, atomicRadius: 152,
    metallicCharacter: 'Kim loại', highestOxide: 'Co₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Co(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Pin xe điện lithium-cobalt, nam châm vĩnh cửu Alnico, vitamin B12 (cobalamin).',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 28, symbol: 'Ni', nameVi: 'Nickel', nameIupac: 'Nickel', atomicMass: 58.693, period: 4, group: 10, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d⁸ 4s²', electronegativity: 1.91, atomicRadius: 149,
    metallicCharacter: 'Kim loại', highestOxide: 'NiO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ni(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Thép không gỉ cao cấp, tiền xu, xúc tác hydro hóa dầu thực vật thành bơ thực vật.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 29, symbol: 'Cu', nameVi: 'Copper', nameIupac: 'Copper', atomicMass: 63.546, period: 4, group: 11, groupLabel: 'IB',
    category: 'transition-metal', electronConfig: '[Ar] 3d¹⁰ 4s¹', electronegativity: 1.90, atomicRadius: 145,
    metallicCharacter: 'Kim loại', highestOxide: 'CuO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Cu(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Dây dẫn điện, ống đồng dẫn nước, hợp kim đồng thanh và đồng thau, chất diệt nấm CuSO₄.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 30, symbol: 'Zn', nameVi: 'Zinc', nameIupac: 'Zinc', atomicMass: 65.38, period: 4, group: 12, groupLabel: 'IIB',
    category: 'transition-metal', electronConfig: '[Ar] 3d¹⁰ 4s²', electronegativity: 1.65, atomicRadius: 142,
    metallicCharacter: 'Kim loại', highestOxide: 'ZnO', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Zn(OH)₂', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Tôn mạ kẽm chống rỉ, pin kẽm-carbon, kem chống nắng chứa ZnO, vi chất miễn dịch cho cơ thể.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 31, symbol: 'Ga', nameVi: 'Gallium', nameIupac: 'Gallium', atomicMass: 69.723, period: 4, group: 13, groupLabel: 'IIIA',
    category: 'post-transition-metal', electronConfig: '[Ar] 3d¹⁰ 4s² 4p¹', electronegativity: 1.81, atomicRadius: 136,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Ga₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Ga(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Chất bán dẫn GaAs trong đèn LED, vi mạch cao tần 5G, nhiệt kế dải nhiệt độ cao.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 32, symbol: 'Ge', nameVi: 'Germanium', nameIupac: 'Germanium', atomicMass: 72.63, period: 4, group: 14, groupLabel: 'IVA',
    category: 'metalloid', electronConfig: '[Ar] 3d¹⁰ 4s² 4p²', electronegativity: 2.01, atomicRadius: 125,
    metallicCharacter: 'Á kim', highestOxide: 'GeO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'H₂GeO₃', hydroxideNature: 'Acid yếu',
    applications: 'Cáp quang sợi thủy tinh, kính hồng ngoại quan sát ban đêm, bóng bán dẫn transistor đầu tiên.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 33, symbol: 'As', nameVi: 'Arsenic', nameIupac: 'Arsenic', atomicMass: 74.922, period: 4, group: 15, groupLabel: 'VA',
    category: 'metalloid', electronConfig: '[Ar] 3d¹⁰ 4s² 4p³', electronegativity: 2.18, atomicRadius: 114,
    metallicCharacter: 'Á kim', highestOxide: 'As₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₃AsO₄', hydroxideNature: 'Acid trung bình',
    applications: 'Bán dẫn hợp chất GaAs, chất bảo quản gỗ trước đây, độc tố asen nổi tiếng lịch sử.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 34, symbol: 'Se', nameVi: 'Selenium', nameIupac: 'Selenium', atomicMass: 78.971, period: 4, group: 16, groupLabel: 'VIA',
    category: 'reactive-nonmetal', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁴', electronegativity: 2.55, atomicRadius: 103,
    metallicCharacter: 'Phi kim', highestOxide: 'SeO₃', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'H₂SeO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Trống cảm quang máy in photocopy, pin quang điện, vi khoáng chống oxy hóa trong thực phẩm.',
    colorScheme: { bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/30' }
  },
  {
    z: 35, symbol: 'Br', nameVi: 'Bromine', nameIupac: 'Bromine', atomicMass: 79.904, period: 4, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', electronegativity: 2.96, atomicRadius: 94,
    metallicCharacter: 'Phi kim mạnh', highestOxide: 'Br₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HBrO₄', hydroxideNature: 'Acid rất mạnh',
    applications: 'Chất chống cháy trong nhựa vi mạch điện tử, thuốc an thần cổ điển, phẩm nhuộm màu tím Tyrian.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 36, symbol: 'Kr', nameVi: 'Krypton', nameIupac: 'Krypton', atomicMass: 83.798, period: 4, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', atomicRadius: 88,
    metallicCharacter: 'Khí hiếm', highestOxide: 'Không có', oxideNature: 'Trơ',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Đèn chớp đường băng sân bay sương mù, laser excimer trong phẫu thuật mắt LASIK.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 5
  {
    z: 37, symbol: 'Rb', nameVi: 'Rubidium', nameIupac: 'Rubidium', atomicMass: 85.468, period: 5, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[Kr] 5s¹', electronegativity: 0.82, atomicRadius: 265,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'Rb₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'RbOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Đồng hồ nguyên tử có độ chính xác cao trong vệ tinh định vị GPS, nghiên cứu vật lý nhiệt độ siêu hàn.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 38, symbol: 'Sr', nameVi: 'Strontium', nameIupac: 'Strontium', atomicMass: 87.62, period: 5, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[Kr] 5s²', electronegativity: 0.95, atomicRadius: 219,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'SrO', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'Sr(OH)₂', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Pháo hoa màu đỏ tươi rực rỡ, đồng hồ nguyên tử strontium chính xác nhất thế giới hiện nay.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  {
    z: 39, symbol: 'Y', nameVi: 'Yttrium', nameIupac: 'Yttrium', atomicMass: 88.906, period: 5, group: 3, groupLabel: 'IIIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d¹ 5s²', electronegativity: 1.22, atomicRadius: 212,
    metallicCharacter: 'Kim loại', highestOxide: 'Y₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Y(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Vật liệu siêu dẫn nhiệt độ cao YBCO, tinh thể laser Nd:YAG dùng trong gia công kim loại và y tế.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 40, symbol: 'Zr', nameVi: 'Zirconium', nameIupac: 'Zirconium', atomicMass: 91.224, period: 5, group: 4, groupLabel: 'IVB',
    category: 'transition-metal', electronConfig: '[Kr] 4d² 5s²', electronegativity: 1.33, atomicRadius: 206,
    metallicCharacter: 'Kim loại', highestOxide: 'ZrO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Zr(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Ống dẫn nhiên liệu hạt nhân chống ăn mòn trong lò phản ứng, đá kim cương nhân tạo zirconia (Cubic Zirconia).',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 41, symbol: 'Nb', nameVi: 'Niobium', nameIupac: 'Niobium', atomicMass: 92.906, period: 5, group: 5, groupLabel: 'VB',
    category: 'transition-metal', electronConfig: '[Kr] 4d⁴ 5s¹', electronegativity: 1.6, atomicRadius: 198,
    metallicCharacter: 'Kim loại', highestOxide: 'Nb₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HNbO₃', hydroxideNature: 'Acid yếu',
    applications: 'Hợp kim siêu dẫn từ trường trong máy gia tốc hạt LHC CERN, thép chịu nhiệt tuabin phản lực.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 42, symbol: 'Mo', nameVi: 'Molybdenum', nameIupac: 'Molybdenum', atomicMass: 95.95, period: 5, group: 6, groupLabel: 'VIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d⁵ 5s¹', electronegativity: 2.16, atomicRadius: 190,
    metallicCharacter: 'Kim loại', highestOxide: 'MoO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₂MoO₄', hydroxideNature: 'Acid yếu',
    applications: 'Thép siêu cứng không rỉ cho xe tăng, động cơ tên lửa, dầu bôi trơn nhiệt độ cao MoS₂.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 43, symbol: 'Tc', nameVi: 'Technetium', nameIupac: 'Technetium', atomicMass: 98, period: 5, group: 7, groupLabel: 'VIIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d⁵ 5s²', electronegativity: 1.9, atomicRadius: 183,
    metallicCharacter: 'Kim loại', highestOxide: 'Tc₂O₇', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'HTcO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Đồng vị Tc-99m là chất đánh dấu phóng xạ quan trọng nhất trong y học hạt nhân chụp chiếu cơ quan nội tạng.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 44, symbol: 'Ru', nameVi: 'Ruthenium', nameIupac: 'Ruthenium', atomicMass: 101.07, period: 5, group: 8, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d⁷ 5s¹', electronegativity: 2.2, atomicRadius: 178,
    metallicCharacter: 'Kim loại', highestOxide: 'RuO₄', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'H₂RuO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Đĩa cứng máy tính điện tử lưu trữ dữ liệu, xúc tác hóa học hữu cơ cao cấp giải Nobel Grubbs.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 45, symbol: 'Rh', nameVi: 'Rhodium', nameIupac: 'Rhodium', atomicMass: 102.91, period: 5, group: 9, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d⁸ 5s¹', electronegativity: 2.28, atomicRadius: 173,
    metallicCharacter: 'Kim loại', highestOxide: 'Rh₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Rh(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Bộ lọc khí thải xúc tác ba chiều trên ô tô, mạ trang sức vàng trắng sáng bóng vĩnh cửu.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 46, symbol: 'Pd', nameVi: 'Palladium', nameIupac: 'Palladium', atomicMass: 106.42, period: 5, group: 10, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d¹⁰', electronegativity: 2.20, atomicRadius: 169,
    metallicCharacter: 'Kim loại', highestOxide: 'PdO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Pd(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Bộ chuyển đổi xúc tác khí thải xe ô tô, pin nhiên liệu hydro, trang sức kim loại quý.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 47, symbol: 'Ag', nameVi: 'Silver', nameIupac: 'Silver', atomicMass: 107.87, period: 5, group: 11, groupLabel: 'IB',
    category: 'transition-metal', electronConfig: '[Kr] 4d¹⁰ 5s¹', electronegativity: 1.93, atomicRadius: 165,
    metallicCharacter: 'Kim loại', highestOxide: 'Ag₂O', oxideNature: 'Basic oxide',
    highestHydroxide: 'AgOH', hydroxideNature: 'Base yếu (kém bền)',
    applications: 'Kim loại dẫn điện và dẫn nhiệt tốt nhất trong bảng tuần hoàn, tráng gương, tiền tệ, nano bạc kháng khuẩn.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 48, symbol: 'Cd', nameVi: 'Cadmium', nameIupac: 'Cadmium', atomicMass: 112.41, period: 5, group: 12, groupLabel: 'IIB',
    category: 'transition-metal', electronConfig: '[Kr] 4d¹⁰ 5s²', electronegativity: 1.69, atomicRadius: 161,
    metallicCharacter: 'Kim loại', highestOxide: 'CdO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Cd(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Pin niken-cadmium NiCd sạc lại trước đây, thanh điều khiển hấp thụ neutron trong lò phản ứng hạt nhân.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 49, symbol: 'In', nameVi: 'Indium', nameIupac: 'Indium', atomicMass: 114.82, period: 5, group: 13, groupLabel: 'IIIA',
    category: 'post-transition-metal', electronConfig: '[Kr] 4d¹⁰ 5s² 5p¹', electronegativity: 1.78, atomicRadius: 156,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'In₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'In(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Màng dẫn điện trong suốt ITO (Indium Tin Oxide) của tất cả màn hình cảm ứng smartphone và tivi LCD.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 50, symbol: 'Sn', nameVi: 'Tin', nameIupac: 'Tin', atomicMass: 118.71, period: 5, group: 14, groupLabel: 'IVA',
    category: 'post-transition-metal', electronConfig: '[Kr] 4d¹⁰ 5s² 5p²', electronegativity: 1.96, atomicRadius: 145,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'SnO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Sn(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Hợp kim hàn bo mạch điện tử, mạ thiếc hộp đựng thực phẩm đồ hộp chống ăn mòn axit thực phẩm.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 51, symbol: 'Sb', nameVi: 'Antimony', nameIupac: 'Antimony', atomicMass: 121.76, period: 5, group: 15, groupLabel: 'VA',
    category: 'metalloid', electronConfig: '[Kr] 4d¹⁰ 5s² 5p³', electronegativity: 2.05, atomicRadius: 133,
    metallicCharacter: 'Á kim', highestOxide: 'Sb₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₃SbO₄', hydroxideNature: 'Acid yếu',
    applications: 'Chất chống cháy trong đồ chơi trẻ em, hợp kim chì-antimon trong ắc quy xe tải để tăng độ cứng.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 52, symbol: 'Te', nameVi: 'Tellurium', nameIupac: 'Tellurium', atomicMass: 127.60, period: 5, group: 16, groupLabel: 'VIA',
    category: 'metalloid', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁴', electronegativity: 2.1, atomicRadius: 123,
    metallicCharacter: 'Á kim', highestOxide: 'TeO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₆TeO₆', hydroxideNature: 'Acid yếu',
    applications: 'Pin năng lượng mặt trời màng mỏng Cadmium-Telluride (CdTe), hợp kim tản nhiệt bán dẫn.',
    colorScheme: { bg: 'bg-teal-950/60', border: 'border-teal-500/40', text: 'text-teal-300', glow: 'shadow-teal-500/30' }
  },
  {
    z: 53, symbol: 'I', nameVi: 'Iodine', nameIupac: 'Iodine', atomicMass: 126.90, period: 5, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', electronegativity: 2.66, atomicRadius: 115,
    metallicCharacter: 'Phi kim', highestOxide: 'I₂O₅', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'HIO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Cồn cọ rửa sát trùng vết thương Betadine povidone-iodine, muối ăn iot phòng chống bệnh bướu cổ.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 54, symbol: 'Xe', nameVi: 'Xenon', nameIupac: 'Xenon', atomicMass: 131.29, period: 5, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', atomicRadius: 108,
    metallicCharacter: 'Khí hiếm', highestOxide: 'XeO₄', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'H₄XeO₆', hydroxideNature: 'Acid rất mạnh',
    applications: 'Động cơ đẩy ion trên các vệ tinh không gian sâu Deep Space, đèn xenon ô tô siêu sáng ban đêm.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 6
  {
    z: 55, symbol: 'Cs', nameVi: 'Caesium', nameIupac: 'Caesium', atomicMass: 132.91, period: 6, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[Xe] 6s¹', electronegativity: 0.79, atomicRadius: 298,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'Cs₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'CsOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Định nghĩa chuẩn 1 giây quốc tế SI dựa trên tần số dao động nguyên tử Cs-133.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 56, symbol: 'Ba', nameVi: 'Barium', nameIupac: 'Barium', atomicMass: 137.33, period: 6, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[Xe] 6s²', electronegativity: 0.89, atomicRadius: 253,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'BaO', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'Ba(OH)₂', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Dung dịch cản quang BaSO₄ chụp X-quang đường ruột, pháo hoa phát ánh sáng xanh lá cây.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  // Lanthanides (57-71)
  {
    z: 57, symbol: 'La', nameVi: 'Lanthanum', nameIupac: 'Lanthanum', atomicMass: 138.91, period: 6, group: 3, groupLabel: 'IIIB',
    category: 'lanthanide', electronConfig: '[Xe] 5d¹ 6s²', electronegativity: 1.1, atomicRadius: 187,
    metallicCharacter: 'Kim loại', highestOxide: 'La₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'La(OH)₃', hydroxideNature: 'Base trung bình/yếu',
    applications: 'Thấu kính máy ảnh quang học cao cấp chống quang sai, pin lai hybrid xe hơi NiMH.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 58, symbol: 'Ce', nameVi: 'Cerium', nameIupac: 'Cerium', atomicMass: 140.12, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹ 5d¹ 6s²', electronegativity: 1.12, atomicRadius: 181,
    metallicCharacter: 'Kim loại', highestOxide: 'CeO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ce(OH)₄', hydroxideNature: 'Base yếu',
    applications: 'Bột đánh bóng kính quang học màn hình điện thoại, đá lửa bật lửa zippo mishmetal.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 59, symbol: 'Pr', nameVi: 'Praseodymium', nameIupac: 'Praseodymium', atomicMass: 140.91, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f³ 6s²', electronegativity: 1.13, atomicRadius: 182,
    metallicCharacter: 'Kim loại', highestOxide: 'Pr₆O₁₁', oxideNature: 'Basic oxide',
    highestHydroxide: 'Pr(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Kính hàn bảo vệ mắt thợ hàn tránh tia cực tím tử ngoại, tạo màu vàng cho men gốm.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 60, symbol: 'Nd', nameVi: 'Neodymium', nameIupac: 'Neodymium', atomicMass: 144.24, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁴ 6s²', electronegativity: 1.14, atomicRadius: 181,
    metallicCharacter: 'Kim loại', highestOxide: 'Nd₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Nd(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Nam châm siêu vĩnh cửu NdFeB mạnh nhất hành tinh trong loa tai nghe, động cơ xe điện Tesla.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 61, symbol: 'Pm', nameVi: 'Promethium', nameIupac: 'Promethium', atomicMass: 145, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁵ 6s²', electronegativity: 1.13, atomicRadius: 180,
    metallicCharacter: 'Kim loại', highestOxide: 'Pm₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Pm(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Pin hạt nhân tuổi thọ hàng chục năm cho máy tạo nhịp tim và tàu thám hiểm vũ trụ.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 62, symbol: 'Sm', nameVi: 'Samarium', nameIupac: 'Samarium', atomicMass: 150.36, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁶ 6s²', electronegativity: 1.17, atomicRadius: 180,
    metallicCharacter: 'Kim loại', highestOxide: 'Sm₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Sm(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Nam châm Samarium-Cobalt chịu nhiệt độ cực cao tới 300°C trong tên lửa quân sự.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 63, symbol: 'Eu', nameVi: 'Europium', nameIupac: 'Europium', atomicMass: 151.96, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁷ 6s²', electronegativity: 1.2, atomicRadius: 199,
    metallicCharacter: 'Kim loại', highestOxide: 'Eu₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Eu(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Chất phát quang màu đỏ chống làm tiền giả trên tờ tiền giấy Euro của Liên minh Châu Âu.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 64, symbol: 'Gd', nameVi: 'Gadolinium', nameIupac: 'Gadolinium', atomicMass: 157.25, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁷ 5d¹ 6s²', electronegativity: 1.2, atomicRadius: 179,
    metallicCharacter: 'Kim loại', highestOxide: 'Gd₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Gd(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Thuốc đối quang từ tiêm tĩnh mạch trong chụp cộng hưởng từ MRI chẩn đoán u não.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 65, symbol: 'Tb', nameVi: 'Terbium', nameIupac: 'Terbium', atomicMass: 158.93, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f⁹ 6s²', electronegativity: 1.2, atomicRadius: 177,
    metallicCharacter: 'Kim loại', highestOxide: 'Tb₄O₇', oxideNature: 'Basic oxide',
    highestHydroxide: 'Tb(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Chất phát quang xanh lục trong đèn huỳnh quang tiết kiệm điện, vật liệu cảm biến Terfenol-D.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 66, symbol: 'Dy', nameVi: 'Dysprosium', nameIupac: 'Dysprosium', atomicMass: 162.50, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹⁰ 6s²', electronegativity: 1.22, atomicRadius: 176,
    metallicCharacter: 'Kim loại', highestOxide: 'Dy₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Dy(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Phụ gia ổn định từ tính nhiệt độ cao cho nam châm động cơ xe điện hybrid.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 67, symbol: 'Ho', nameVi: 'Holmium', nameIupac: 'Holmium', atomicMass: 164.93, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹¹ 6s²', electronegativity: 1.23, atomicRadius: 175,
    metallicCharacter: 'Kim loại', highestOxide: 'Ho₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ho(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Laser Holmium-YAG tán sỏi thận không xâm lấn trong phẫu thuật nội soi y khoa.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 68, symbol: 'Er', nameVi: 'Erbium', nameIupac: 'Erbium', atomicMass: 167.26, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹² 6s²', electronegativity: 1.24, atomicRadius: 174,
    metallicCharacter: 'Kim loại', highestOxide: 'Er₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Er(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Bộ khuếch đại quang học EDFA giúp tín hiệu internet cáp quang truyền hàng ngàn km dưới đáy biển.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 69, symbol: 'Tm', nameVi: 'Thulium', nameIupac: 'Thulium', atomicMass: 168.93, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹³ 6s²', electronegativity: 1.25, atomicRadius: 173,
    metallicCharacter: 'Kim loại', highestOxide: 'Tm₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Tm(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Nguồn tia X di động trong thiết bị chụp X-quang hiện trường cứu hộ thiên tai.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 70, symbol: 'Yb', nameVi: 'Ytterbium', nameIupac: 'Ytterbium', atomicMass: 173.05, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹⁴ 6s²', electronegativity: 1.1, atomicRadius: 193,
    metallicCharacter: 'Kim loại', highestOxide: 'Yb₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Yb(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Đồng hồ quang học nguyên tử chính xác nhất thế giới, tia laser sợi quang cắt kim loại dày.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  {
    z: 71, symbol: 'Lu', nameVi: 'Lutetium', nameIupac: 'Lutetium', atomicMass: 174.97, period: 6, group: 3, groupLabel: 'Lanthanide',
    category: 'lanthanide', electronConfig: '[Xe] 4f¹⁴ 5d¹ 6s²', electronegativity: 1.27, atomicRadius: 172,
    metallicCharacter: 'Kim loại', highestOxide: 'Lu₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Lu(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Đồng vị Lu-177 dùng trong liệu pháp xạ trị đích điều trị ung thư tuyến tiền liệt di căn.',
    colorScheme: { bg: 'bg-fuchsia-950/60', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-500/30' }
  },
  // Continuing Period 6 transition metals
  {
    z: 72, symbol: 'Hf', nameVi: 'Hafnium', nameIupac: 'Hafnium', atomicMass: 178.49, period: 6, group: 4, groupLabel: 'IVB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d² 6s²', electronegativity: 1.3, atomicRadius: 159,
    metallicCharacter: 'Kim loại', highestOxide: 'HfO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Hf(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Chất điện môi High-k gate oxide trong bộ vi xử lý Intel Core i-series tiên tiến.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 73, symbol: 'Ta', nameVi: 'Tantalum', nameIupac: 'Tantalum', atomicMass: 180.95, period: 6, group: 5, groupLabel: 'VB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d³ 6s²', electronegativity: 1.5, atomicRadius: 146,
    metallicCharacter: 'Kim loại', highestOxide: 'Ta₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HTaO₃', hydroxideNature: 'Acid yếu',
    applications: 'Tụ điện tantan kích thước nhỏ dung lượng cực lớn trong iPhone và máy bay không người lái.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 74, symbol: 'W', nameVi: 'Tungsten', nameIupac: 'Tungsten', atomicMass: 183.84, period: 6, group: 6, groupLabel: 'VIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d⁴ 6s²', electronegativity: 2.36, atomicRadius: 139,
    metallicCharacter: 'Kim loại', highestOxide: 'WO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₂WO₄', hydroxideNature: 'Acid yếu',
    applications: 'Dây tóc bóng đèn sợi đốt, kim loại có nhiệt độ nóng chảy cao nhất (3422°C), mũi khoan vonfram.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 75, symbol: 'Re', nameVi: 'Rhenium', nameIupac: 'Rhenium', atomicMass: 186.21, period: 6, group: 7, groupLabel: 'VIIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d⁵ 6s²', electronegativity: 1.9, atomicRadius: 137,
    metallicCharacter: 'Kim loại', highestOxide: 'Re₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HReO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Cánh tuabin động cơ máy bay phản lực thương mại Boeing & Airbus chịu nhiệt độ khắc nghiệt.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 76, symbol: 'Os', nameVi: 'Osmium', nameIupac: 'Osmium', atomicMass: 190.23, period: 6, group: 8, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d⁶ 6s²', electronegativity: 2.2, atomicRadius: 135,
    metallicCharacter: 'Kim loại', highestOxide: 'OsO₄', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'H₂OsO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Kim loại đặc nhất Trái Đất (D = 22.59 g/cm³), ngòi bút máy cao cấp, nhuộm mẫu sinh học kính hiển vi điện tử.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 77, symbol: 'Ir', nameVi: 'Iridium', nameIupac: 'Iridium', atomicMass: 192.22, period: 6, group: 9, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d⁷ 6s²', electronegativity: 2.2, atomicRadius: 136,
    metallicCharacter: 'Kim loại', highestOxide: 'IrO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ir(OH)₄', hydroxideNature: 'Base yếu',
    applications: 'Bugi đánh lửa ô tô siêu bền, thước đo mét tiêu chuẩn quốc tế lịch sử chế tạo từ hợp kim Pt-Ir.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 78, symbol: 'Pt', nameVi: 'Platinum', nameIupac: 'Platinum', atomicMass: 195.08, period: 6, group: 10, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', electronegativity: 2.28, atomicRadius: 139,
    metallicCharacter: 'Kim loại', highestOxide: 'PtO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Pt(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Kim loại quý bạch kim làm trang sức sang trọng, thuốc hóa trị ung thư cisplatin, xúc tác chuyển hóa hóa dầu.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 79, symbol: 'Au', nameVi: 'Gold', nameIupac: 'Gold', atomicMass: 196.97, period: 6, group: 11, groupLabel: 'IB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronegativity: 2.54, atomicRadius: 144,
    metallicCharacter: 'Kim loại', highestOxide: 'Au₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Au(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Kho dự trữ ngoại hối vàng của các ngân hàng trung ương thế giới, mạ vi mạch máy tính cao cấp chống oxy hóa.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 80, symbol: 'Hg', nameVi: 'Mercury', nameIupac: 'Mercury', atomicMass: 200.59, period: 6, group: 12, groupLabel: 'IIB',
    category: 'transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', electronegativity: 2.0, atomicRadius: 151,
    metallicCharacter: 'Kim loại', highestOxide: 'HgO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Hg(OH)₂', hydroxideNature: 'Base yếu (kém bền)',
    applications: 'Nhiệt kế thủy ngân cổ điển, hỗn hồng trám răng amalgam, đèn huỳnh quang ánh sáng trắng.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 81, symbol: 'Tl', nameVi: 'Thallium', nameIupac: 'Thallium', atomicMass: 204.38, period: 6, group: 13, groupLabel: 'IIIA',
    category: 'post-transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', electronegativity: 1.62, atomicRadius: 170,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Tl₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Tl(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Thấu kính hồng ngoại cảm biến nhiệt độ quân sự, chất cản xạ tim thallium-201.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 82, symbol: 'Pb', nameVi: 'Lead', nameIupac: 'Lead', atomicMass: 207.2, period: 6, group: 14, groupLabel: 'IVA',
    category: 'post-transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronegativity: 2.33, atomicRadius: 175,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'PbO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Pb(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Tấm chắn phòng chụp X-quang và phóng xạ hạt nhân, bản cực ắc quy axit-chì xe máy ô tô.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 83, symbol: 'Bi', nameVi: 'Bismuth', nameIupac: 'Bismuth', atomicMass: 208.98, period: 6, group: 15, groupLabel: 'VA',
    category: 'post-transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', electronegativity: 2.02, atomicRadius: 150,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Bi₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HBiO₃', hydroxideNature: 'Acid yếu',
    applications: 'Thuốc chữa đau dạ dày trào ngược Pepto-Bismol, cầu chì nhiệt tự ngắt báo cháy sprinkler.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 84, symbol: 'Po', nameVi: 'Polonium', nameIupac: 'Polonium', atomicMass: 209, period: 6, group: 16, groupLabel: 'VIA',
    category: 'post-transition-metal', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', electronegativity: 2.0, atomicRadius: 168,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'PoO₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Po(OH)₆', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Khử tĩnh điện trong sản xuất phim ảnh công nghiệp, nguồn phát hạt alpha của bà Marie Curie.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 85, symbol: 'At', nameVi: 'Astatine', nameIupac: 'Astatine', atomicMass: 210, period: 6, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', electronegativity: 2.2, atomicRadius: 140,
    metallicCharacter: 'Phi kim', highestOxide: 'At₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HAtO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Xạ trị hạt alpha định hướng tế bào ung thư, nguyên tố hiếm nhất tự nhiên trong vỏ Trái Đất.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 86, symbol: 'Rn', nameVi: 'Radon', nameIupac: 'Radon', atomicMass: 222, period: 6, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', atomicRadius: 150,
    metallicCharacter: 'Khí hiếm', highestOxide: 'RnO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Xạ trị ung thư cấy hạt phóng xạ hạt nhân brachytherapy, giám sát địa chấn dự báo động đất ngầm.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  },

  // Period 7
  {
    z: 87, symbol: 'Fr', nameVi: 'Francium', nameIupac: 'Francium', atomicMass: 223, period: 7, group: 1, groupLabel: 'IA',
    category: 'alkali-metal', electronConfig: '[Rn] 7s¹', electronegativity: 0.7, atomicRadius: 348,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'Fr₂O', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'FrOH', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Nghiên cứu cấu trúc hạt nhân trong bẫy laser lạnh, cực kỳ phóng xạ và không tồn tại lượng lớn.',
    colorScheme: { bg: 'bg-rose-950/60', border: 'border-rose-500/40', text: 'text-rose-300', glow: 'shadow-rose-500/30' }
  },
  {
    z: 88, symbol: 'Ra', nameVi: 'Radium', nameIupac: 'Radium', atomicMass: 226, period: 7, group: 2, groupLabel: 'IIA',
    category: 'alkaline-earth', electronConfig: '[Rn] 7s²', electronegativity: 0.9, atomicRadius: 283,
    metallicCharacter: 'Kim loại mạnh', highestOxide: 'RaO', oxideNature: 'Basic oxide (kiềm mạnh)',
    highestHydroxide: 'Ra(OH)₂', hydroxideNature: 'Base mạnh (kiềm)',
    applications: 'Lịch sử từng dùng làm sơn dạ quang trên mặt đồng hồ kim phát sáng ban đêm của thế kỷ trước.',
    colorScheme: { bg: 'bg-amber-950/60', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/30' }
  },
  // Actinides (89-103)
  {
    z: 89, symbol: 'Ac', nameVi: 'Actinium', nameIupac: 'Actinium', atomicMass: 227, period: 7, group: 3, groupLabel: 'IIIB',
    category: 'actinide', electronConfig: '[Rn] 6d¹ 7s²', electronegativity: 1.1, atomicRadius: 215,
    metallicCharacter: 'Kim loại', highestOxide: 'Ac₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ac(OH)₃', hydroxideNature: 'Base trung bình/yếu',
    applications: 'Đồng vị phóng xạ Ac-225 trong liệu pháp miễn dịch nhắm trúng đích diệt khối u ác tính.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 90, symbol: 'Th', nameVi: 'Thorium', nameIupac: 'Thorium', atomicMass: 232.04, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 6d² 7s²', electronegativity: 1.3, atomicRadius: 206,
    metallicCharacter: 'Kim loại', highestOxide: 'ThO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Th(OH)₄', hydroxideNature: 'Base yếu',
    applications: 'Nhiên liệu hạt nhân sạch tiềm năng thế hệ mới cho lò phản ứng muối nóng chảy Thorium MSR.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 91, symbol: 'Pa', nameVi: 'Protactinium', nameIupac: 'Protactinium', atomicMass: 231.04, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f² 6d¹ 7s²', electronegativity: 1.5, atomicRadius: 200,
    metallicCharacter: 'Kim loại', highestOxide: 'Pa₂O₅', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Pa(OH)₅', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Nghiên cứu địa chất niên đại trầm tích dưới đáy đại dương dựa trên chuỗi phân rã phóng xạ.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 92, symbol: 'U', nameVi: 'Uranium', nameIupac: 'Uranium', atomicMass: 238.03, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f³ 6d¹ 7s²', electronegativity: 1.38, atomicRadius: 196,
    metallicCharacter: 'Kim loại', highestOxide: 'UO₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'UO₂(OH)₂', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Nhiên liệu hạt nhân U-235 trong các nhà máy điện hạt nhân cung cấp điện sạch, vũ khí hạt nhân.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 93, symbol: 'Np', nameVi: 'Neptunium', nameIupac: 'Neptunium', atomicMass: 237, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f⁴ 6d¹ 7s²', electronegativity: 1.36, atomicRadius: 190,
    metallicCharacter: 'Kim loại', highestOxide: 'Np₂O₅', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'NpO₂(OH)₂', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Tiền chất sản xuất Plutonium-238 dùng làm nguồn phát nhiệt RTG cho tàu không gian du hành.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 94, symbol: 'Pu', nameVi: 'Plutonium', nameIupac: 'Plutonium', atomicMass: 244, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f⁶ 7s²', electronegativity: 1.28, atomicRadius: 187,
    metallicCharacter: 'Kim loại', highestOxide: 'PuO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Pu(OH)₄', hydroxideNature: 'Base yếu',
    applications: 'Nguồn phát điện nhiệt phóng xạ RTG nuôi sống tàu thám hiểm sao Hỏa Curiosity và tàu Voyager.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 95, symbol: 'Am', nameVi: 'Americium', nameIupac: 'Americium', atomicMass: 243, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f⁷ 7s²', electronegativity: 1.3, atomicRadius: 180,
    metallicCharacter: 'Kim loại', highestOxide: 'AmO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Am(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Đồng vị Am-241 trong máy cảm biến báo khói gia đình ion hóa lắp đặt ở trần nhà cứu sống hàng ngàn người.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 96, symbol: 'Cm', nameVi: 'Curium', nameIupac: 'Curium', atomicMass: 247, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f⁷ 6d¹ 7s²', electronegativity: 1.3, atomicRadius: 169,
    metallicCharacter: 'Kim loại', highestOxide: 'Cm₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Cm(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Mẫu phân tích quang phổ hạt alpha APXS gắn trên các xe thám hiểm bề mặt Sao Hỏa NASA.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 97, symbol: 'Bk', nameVi: 'Berkelium', nameIupac: 'Berkelium', atomicMass: 247, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f⁹ 7s²', electronegativity: 1.3, atomicRadius: 168,
    metallicCharacter: 'Kim loại', highestOxide: 'BkO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Bk(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Mục tiêu bắn phá hạt nhân để tổng hợp nguyên tố siêu nặng số 117 Tennessine.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 98, symbol: 'Cf', nameVi: 'Californium', nameIupac: 'Californium', atomicMass: 251, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹⁰ 7s²', electronegativity: 1.3, atomicRadius: 168,
    metallicCharacter: 'Kim loại', highestOxide: 'Cf₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Cf(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Nguồn phát neutron mạnh mẽ để phát hiện vết nứt ngầm trong cánh máy bay và thăm dò giếng dầu khí.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 99, symbol: 'Es', nameVi: 'Einsteinium', nameIupac: 'Einsteinium', atomicMass: 252, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹¹ 7s²', electronegativity: 1.3, atomicRadius: 165,
    metallicCharacter: 'Kim loại', highestOxide: 'Es₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Es(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Được phát hiện trong tàn dư vụ nổ thử nghiệm bom nhiệt hạch Ivy Mike năm 1952, phục vụ nghiên cứu vật lý.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 100, symbol: 'Fm', nameVi: 'Fermium', nameIupac: 'Fermium', atomicMass: 257, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹² 7s²', electronegativity: 1.3, atomicRadius: 167,
    metallicCharacter: 'Kim loại', highestOxide: 'Fm₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Fm(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Nguyên tố nặng nhất có thể tạo ra bằng phương pháp bắt neutron trong lò phản ứng hạt nhân.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 101, symbol: 'Md', nameVi: 'Mendelevium', nameIupac: 'Mendelevium', atomicMass: 258, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹³ 7s²', electronegativity: 1.3, atomicRadius: 173,
    metallicCharacter: 'Kim loại', highestOxide: 'Md₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Md(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Vinh danh cha đẻ Bảng tuần hoàn Dmitri Mendeleev, được tổng hợp từng nguyên tử một trong máy gia tốc.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 102, symbol: 'No', nameVi: 'Nobelium', nameIupac: 'Nobelium', atomicMass: 259, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹⁴ 7s²', electronegativity: 1.3, atomicRadius: 176,
    metallicCharacter: 'Kim loại', highestOxide: 'No₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'No(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Vinh danh nhà sáng lập giải Nobel Alfred Nobel, chỉ dùng cho nghiên cứu hóa học lượng tử actinide.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  {
    z: 103, symbol: 'Lr', nameVi: 'Lawrencium', nameIupac: 'Lawrencium', atomicMass: 266, period: 7, group: 3, groupLabel: 'Actinide',
    category: 'actinide', electronConfig: '[Rn] 5f¹⁴ 7s² 7p¹', electronegativity: 1.3, atomicRadius: 161,
    metallicCharacter: 'Kim loại', highestOxide: 'Lr₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Lr(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Khép lại chuỗi họ Actini, được đặt tên theo Ernest Lawrence, người phát minh máy gia tốc cyclotron.',
    colorScheme: { bg: 'bg-pink-950/60', border: 'border-pink-500/40', text: 'text-pink-300', glow: 'shadow-pink-500/30' }
  },
  // Continuing Period 7 Transactinides (104-118)
  {
    z: 104, symbol: 'Rf', nameVi: 'Rutherfordium', nameIupac: 'Rutherfordium', atomicMass: 267, period: 7, group: 4, groupLabel: 'IVB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d² 7s²', atomicRadius: 157,
    metallicCharacter: 'Kim loại', highestOxide: 'RfO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Rf(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Nguyên tố siêu nặng đầu tiên thuộc dãy chuyển tiếp 6d, phục vụ nghiên cứu vật lý hạt nhân lý thuyết.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 105, symbol: 'Db', nameVi: 'Dubnium', nameIupac: 'Dubnium', atomicMass: 268, period: 7, group: 5, groupLabel: 'VB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d³ 7s²', atomicRadius: 149,
    metallicCharacter: 'Kim loại', highestOxide: 'Db₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'HDbO₃', hydroxideNature: 'Acid yếu',
    applications: 'Nghiên cứu tính chất hóa học của các nguyên tố siêu nặng tương tự Tantalum.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 106, symbol: 'Sg', nameVi: 'Seaborgium', nameIupac: 'Seaborgium', atomicMass: 269, period: 7, group: 6, groupLabel: 'VIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁴ 7s²', atomicRadius: 143,
    metallicCharacter: 'Kim loại', highestOxide: 'SgO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₂SgO₄', hydroxideNature: 'Acid yếu',
    applications: 'Tạo phức chất carbonyl Sg(CO)₆ chứng minh tính chất hóa học tương tự Wolfram (W).',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 107, symbol: 'Bh', nameVi: 'Bohrium', nameIupac: 'Bohrium', atomicMass: 270, period: 7, group: 7, groupLabel: 'VIIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁵ 7s²', atomicRadius: 141,
    metallicCharacter: 'Kim loại', highestOxide: 'Bh₂O₇', oxideNature: 'Acidic oxide mạnh',
    highestHydroxide: 'HBhO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Vinh danh nhà vật lý lượng tử vĩ đại Niels Bohr, nghiên cứu oxychloride siêu nặng BhO₃Cl.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 108, symbol: 'Hs', nameVi: 'Hassium', nameIupac: 'Hassium', atomicMass: 269, period: 7, group: 8, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁶ 7s²', atomicRadius: 134,
    metallicCharacter: 'Kim loại', highestOxide: 'HsO₄', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'H₂HsO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Tạo oxide bay hơi HsO₄ ở nhiệt độ phòng tương tự OsO₄, khẳng định vị trí trong Bảng tuần hoàn.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 109, symbol: 'Mt', nameVi: 'Meitnerium', nameIupac: 'Meitnerium', atomicMass: 278, period: 7, group: 9, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁷ 7s²', atomicRadius: 129,
    metallicCharacter: 'Kim loại', highestOxide: 'Mt₂O₃', oxideNature: 'Basic oxide',
    highestHydroxide: 'Mt(OH)₃', hydroxideNature: 'Base yếu',
    applications: 'Vinh danh nhà nữ vật lý Lise Meitner, người đồng phát hiện hiện tượng phân hạch hạt nhân.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 110, symbol: 'Ds', nameVi: 'Darmstadtium', nameIupac: 'Darmstadtium', atomicMass: 281, period: 7, group: 10, groupLabel: 'VIIIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁸ 7s²', atomicRadius: 128,
    metallicCharacter: 'Kim loại', highestOxide: 'DsO₂', oxideNature: 'Basic oxide',
    highestHydroxide: 'Ds(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Nghiên cứu hiệu ứng tương đối tính làm biến dạng obitan electron ngoài cùng ở nguyên tố siêu nặng.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 111, symbol: 'Rg', nameVi: 'Roentgenium', nameIupac: 'Roentgenium', atomicMass: 282, period: 7, group: 11, groupLabel: 'IB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d⁹ 7s²', atomicRadius: 121,
    metallicCharacter: 'Kim loại', highestOxide: 'Rg₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Rg(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Vinh danh Wilhelm Röntgen người phát minh ra tia X, nghiên cứu liên kết kim loại đồng đẳng Vàng.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 112, symbol: 'Cn', nameVi: 'Copernicium', nameIupac: 'Copernicium', atomicMass: 285, period: 7, group: 12, groupLabel: 'IIB',
    category: 'transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', atomicRadius: 122,
    metallicCharacter: 'Kim loại', highestOxide: 'CnO', oxideNature: 'Basic oxide',
    highestHydroxide: 'Cn(OH)₂', hydroxideNature: 'Base yếu',
    applications: 'Có tính bay hơi rất cao do hiệu ứng tương đối tính làm co obitan 7s², hành xử gần giống khí hiếm.',
    colorScheme: { bg: 'bg-sky-950/60', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/30' }
  },
  {
    z: 113, symbol: 'Nh', nameVi: 'Nihonium', nameIupac: 'Nihonium', atomicMass: 286, period: 7, group: 13, groupLabel: 'IIIA',
    category: 'post-transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', atomicRadius: 136,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Nh₂O₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Nh(OH)₃', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Nguyên tố đầu tiên được phát hiện tại Châu Á (Viện RIKEN Nhật Bản), khẳng định tính chất chu kỳ.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 114, symbol: 'Fl', nameVi: 'Flerovium', nameIupac: 'Flerovium', atomicMass: 289, period: 7, group: 14, groupLabel: 'IVA',
    category: 'post-transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', atomicRadius: 143,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'FlO₂', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Fl(OH)₄', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Nằm gần hòn đảo ổn định hạt nhân (Island of Stability), nghiên cứu vật lý hạt nhân hiện đại.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 115, symbol: 'Mc', nameVi: 'Moscovium', nameIupac: 'Moscovium', atomicMass: 290, period: 7, group: 15, groupLabel: 'VA',
    category: 'post-transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', atomicRadius: 162,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'Mc₂O₅', oxideNature: 'Acidic oxide',
    highestHydroxide: 'H₃McO₄', hydroxideNature: 'Acid yếu',
    applications: 'Được tổng hợp tại Viện Nghiên cứu Hạt nhân Dubna Nga, đóng góp vào lý thuyết cấu trúc hạt nhân.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 116, symbol: 'Lv', nameVi: 'Livermorium', nameIupac: 'Livermorium', atomicMass: 293, period: 7, group: 16, groupLabel: 'VIA',
    category: 'post-transition-metal', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', atomicRadius: 175,
    metallicCharacter: 'Kim loại yếu', highestOxide: 'LvO₃', oxideNature: 'Amphoteric oxide (lưỡng tính)',
    highestHydroxide: 'Lv(OH)₆', hydroxideNature: 'Hydroxide lưỡng tính',
    applications: 'Vinh danh Phòng thí nghiệm Quốc gia Lawrence Livermore Hoa Kỳ, nghiên cứu phân rã chuỗi alpha.',
    colorScheme: { bg: 'bg-cyan-950/60', border: 'border-cyan-500/40', text: 'text-cyan-300', glow: 'shadow-cyan-500/30' }
  },
  {
    z: 117, symbol: 'Ts', nameVi: 'Tennessine', nameIupac: 'Tennessine', atomicMass: 294, period: 7, group: 17, groupLabel: 'VIIA',
    category: 'halogen', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', atomicRadius: 165,
    metallicCharacter: 'Phi kim', highestOxide: 'Ts₂O₇', oxideNature: 'Acidic oxide rất mạnh',
    highestHydroxide: 'HTsO₄', hydroxideNature: 'Acid mạnh',
    applications: 'Halogen nặng nhất thế giới được công nhận chính thức bởi IUPAC năm 2016.',
    colorScheme: { bg: 'bg-purple-950/60', border: 'border-purple-500/40', text: 'text-purple-300', glow: 'shadow-purple-500/30' }
  },
  {
    z: 118, symbol: 'Og', nameVi: 'Oganesson', nameIupac: 'Oganesson', atomicMass: 294, period: 7, group: 18, groupLabel: 'VIIIA',
    category: 'noble-gas', electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', atomicRadius: 152,
    metallicCharacter: 'Khí hiếm', highestOxide: 'OgO₃', oxideNature: 'Acidic oxide',
    highestHydroxide: 'Không có', hydroxideNature: 'Trơ',
    applications: 'Nguyên tố số 118 khép lại chu kỳ 7, vinh danh nhà vật lý học hạt nhân huyền thoại Yuri Oganessian.',
    colorScheme: { bg: 'bg-indigo-950/60', border: 'border-indigo-500/40', text: 'text-indigo-300', glow: 'shadow-indigo-500/30' }
  }
];
