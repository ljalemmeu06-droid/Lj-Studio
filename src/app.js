const TRACKS = ["video", "audio", "image", "text", "captions", "transitions"];
const PX_PER_SECOND = 18;
const DEFAULT_DURATION = 8;
const TEMPLATES = [
  { name: "Product Demo", detail: "Screen-led tutorial with webcam, lower third, zoom keyframes, and captions.", clips: "demo" },
  { name: "Course Lesson", detail: "Slides-first teaching layout with timed captions and soft transitions.", clips: "lesson" },
  { name: "Sales Walkthrough", detail: "Polished webcam intro, logo bug, callout text, and CTA lower third.", clips: "sales" },
  { name: "Social Cutdown", detail: "Vertical crop, bold captions, boosted voice, and fast zoom moments.", clips: "social" },
  { name: "Podcast Clip", detail: "Waveform-first edit with headline captions and voice boost.", clips: "podcast" },
  { name: "Webinar Replay", detail: "Long-project layout with chapters, title cards, and clean slide pacing.", clips: "webinar" },
  { name: "Launch Trailer", detail: "Fast keyframes, logo intro, click highlights, and CTA outro.", clips: "launch" },
  { name: "Support Answer", detail: "Short screen-record response with cursor focus and auto captions.", clips: "support" },
  { name: "Executive Brief", detail: "Quiet boardroom styling, chapter lower thirds, and polished export defaults.", clips: "brief" },
  { name: "Vertical Tutorial", detail: "Portrait crop, large captions, click ripples, and mobile-safe overlays.", clips: "vertical" },
];
const ASSET_PRESETS = [
  { name: "Creator Lower Third", type: "text", text: "Name / role", fillColor: "#18212f" },
  { name: "Chapter Title", type: "text", text: "Chapter title", fillColor: "#147d73" },
  { name: "Logo Badge", type: "image", text: "LOGO", fillColor: "#18212f" },
  { name: "Subscribe CTA", type: "text", text: "Subscribe for the next lesson", fillColor: "#e65f4f" },
  { name: "Keyboard Shortcut", type: "text", text: "Ctrl + K", fillColor: "#5f8fd8" },
  { name: "Pro Tip Callout", type: "text", text: "Pro tip", fillColor: "#f2b84b" },
  { name: "Section Divider", type: "text", text: "Next section", fillColor: "#147d73" },
  { name: "Bug Fix Label", type: "text", text: "Fix applied", fillColor: "#e65f4f" },
  { name: "Sponsor Slate", type: "image", text: "SPONSOR", fillColor: "#18212f" },
  { name: "Final CTA", type: "text", text: "Start your project today", fillColor: "#147d73" },
];
const PRO_WORKSPACES = [
  { name: "Media", detail: "Bins, relinking, proxy strategy, metadata, and ingest." },
  { name: "Cut", detail: "Fast assembly, ripple edits, trims, markers, and selects." },
  { name: "Edit", detail: "Full multi-track timeline, keyframes, captions, and effects." },
  { name: "Fusion", detail: "Compositing, motion graphics, masks, and visual effects." },
  { name: "Color", detail: "Color correction, scopes, LUTs, grades, and finishing." },
  { name: "Fairlight", detail: "Dialogue cleanup, EQ, compression, loudness, and mix." },
  { name: "Deliver", detail: "Render queue, presets, codec QA, and MP4 delivery." },
  { name: "Review", detail: "Cloud sync, comments, account packages, and approvals." },
];
const EFFECTS_PRESETS = [
  "Gaussian Blur", "Sharpen", "Drop Shadow", "Chroma Key", "Mask", "Stabilize",
  "Speed Ramp", "Freeze Frame", "Film Grain", "Vignette", "Transform", "Multicam",
  "Proxy Toggle", "Adjustment Layer", "Nested Sequence", "Dynamic Link Slot",
];
const PHOTO_PRESETS = [
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Course Cover", width: 1600, height: 900 },
  { name: "Instagram Square", width: 1080, height: 1080 },
  { name: "TikTok / Reels", width: 1080, height: 1920 },
  { name: "Presentation Slide", width: 1920, height: 1080 },
  { name: "Profile Banner", width: 1500, height: 500 },
];
const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "yi"]);
const LANGUAGE_OPTIONS = [
  ["en", "English"], ["am", "አማርኛ"], ["ti", "ትግርኛ"], ["om", "Afaan Oromoo"], ["so", "Soomaali"],
  ["ar", "العربية"], ["es", "Español"], ["fr", "Français"], ["pt", "Português"], ["de", "Deutsch"],
  ["it", "Italiano"], ["nl", "Nederlands"], ["sv", "Svenska"], ["no", "Norsk"], ["da", "Dansk"],
  ["fi", "Suomi"], ["pl", "Polski"], ["cs", "Čeština"], ["sk", "Slovenčina"], ["hu", "Magyar"],
  ["ro", "Română"], ["bg", "Български"], ["el", "Ελληνικά"], ["tr", "Türkçe"], ["ru", "Русский"],
  ["uk", "Українська"], ["he", "עברית"], ["fa", "فارسی"], ["ur", "اردو"], ["hi", "हिन्दी"],
  ["bn", "বাংলা"], ["pa", "ਪੰਜਾਬੀ"], ["gu", "ગુજરાતી"], ["ta", "தமிழ்"], ["te", "తెలుగు"],
  ["ml", "മലയാളം"], ["kn", "ಕನ್ನಡ"], ["mr", "मराठी"], ["ne", "नेपाली"], ["si", "සිංහල"],
  ["zh", "中文"], ["ja", "日本語"], ["ko", "한국어"], ["vi", "Tiếng Việt"], ["th", "ไทย"],
  ["id", "Bahasa Indonesia"], ["ms", "Bahasa Melayu"], ["fil", "Filipino"], ["sw", "Kiswahili"],
  ["ha", "Hausa"], ["yo", "Yorùbá"], ["ig", "Igbo"], ["zu", "isiZulu"], ["xh", "isiXhosa"],
  ["af", "Afrikaans"], ["sq", "Shqip"], ["az", "Azərbaycanca"], ["eu", "Euskara"], ["ca", "Català"],
  ["hr", "Hrvatski"], ["sr", "Српски"], ["sl", "Slovenščina"], ["lt", "Lietuvių"], ["lv", "Latviešu"],
  ["et", "Eesti"], ["ka", "ქართული"], ["hy", "Հայերեն"], ["kk", "Қазақша"], ["uz", "Oʻzbekcha"],
  ["mn", "Монгол"], ["km", "ខ្មែរ"], ["lo", "ລາວ"], ["my", "မြန်မာ"], ["mk", "Македонски"],
  ["is", "Íslenska"], ["ga", "Gaeilge"], ["cy", "Cymraeg"], ["mt", "Malti"], ["lb", "Lëtzebuergesch"],
];
const UI_TRANSLATIONS = {
  en: {},
  am: {
    "Language": "ቋንቋ", "Record": "ቅዳ", "Edit": "አርትዕ", "Captions": "መግለጫ ጽሁፎች", "Export": "ላክ", "Assets": "ንብረቶች", "Share": "አጋራ", "Suite": "ስብስብ",
    "Inputs": "ግቤቶች", "Screen": "ማያ", "Webcam": "ዌብካም", "Slides": "ስላይዶች", "Microphone": "ማይክሮፎን",
    "Undo": "ቀልብስ", "Redo": "ድገም", "Save project": "ፕሮጀክት አስቀምጥ", "Load project": "ፕሮጀክት ጫን", "Auto setup": "በራስ አዘጋጅ", "Start recording": "መቅዳት ጀምር",
    "Timeline editor": "የጊዜ መስመር አርታዒ", "Play timeline": "ጊዜ መስመር አጫውት", "Import media": "ሚዲያ አስገባ", "Relink media": "ሚዲያ ዳግም አገናኝ",
    "Clip inspector": "ክሊፕ መርማሪ", "Color and scopes": "ቀለም እና ስኮፖች", "Audio mastering": "የድምጽ ማስተር", "Render queue": "የማቅረብ ወረፋ"
  },
  ti: {
    "Language": "ቋንቋ", "Record": "ቅረጽ", "Edit": "ኣርትዕ", "Captions": "መግለጺ ጽሑፍ", "Export": "ሰደድ", "Assets": "ንብረታት", "Share": "ኣካፍል", "Suite": "ስዊት",
    "Inputs": "እታዎታት", "Screen": "ስክሪን", "Webcam": "ዌብካም", "Slides": "ስላይድታት", "Microphone": "ማይክሮፎን",
    "Undo": "መልስ", "Redo": "ዳግም ግበር", "Save project": "ፕሮጀክት ዓቅብ", "Load project": "ፕሮጀክት ጸዓን", "Auto setup": "ብርእሱ ኣዳሉ", "Start recording": "ቅረጻ ጀምር",
    "Permission flow": "ፍቓድ መስርሕ", "Scene layout": "ኣቀማምጣ ትዕይንቲ", "Webcam size": "ዓቐን ዌብካም", "Caption style": "ቅዲ መግለጺ", "Add slide images": "ስእሊ ስላይድ ወስኽ",
    "Timeline editor": "ኣርታዒ መስመር ግዜ", "Play timeline": "መስመር ግዜ ኣጻውት", "Import media": "ሚድያ ኣእቱ", "Relink media": "ሚድያ ዳግም ኣራኽብ",
    "Mark in": "መጀመርታ ምልክት", "Mark out": "መወዳእታ ምልክት", "Keep range": "ክልል ዓቅብ", "Split": "ክፈል", "Multi-track timeline": "ብዙሕ መስመር ግዜ", "Clear": "ኣጽሪ",
    "Transitions": "ምስግጋራት", "Clip inspector": "መርማሪ ክሊፕ", "Motion and cursor": "ምንቅስቓስን ከርሰርን", "Audio waveform": "ቅርጺ ማዕበል ድምጺ",
    "Caption builder": "ሰራሒ መግለጺ", "Generate caption blocks": "ብሎክ መግለጺ ፍጠር", "Apply to preview": "ናብ ቅድመ-ርእይቶ ተግብር", "Add timed caption": "ብግዜ ዝተቐመጠ መግለጺ ወስኽ",
    "Export settings": "ቅጥዕታት ሰደድ", "Export selected timeline": "ዝተመርጸ መስመር ግዜ ሰደድ", "Cancel export": "ሰደድ ሰርዝ",
    "Professional templates": "ሞያዊ ቅጥዕታት", "Asset library": "ቤተ-መጻሕፍቲ ንብረታት", "Performance engine": "ሞተር ኣፈጻጽማ", "Production QA": "ምርግጋጽ ጽሬት ምፍራይ",
    "Account": "ሕሳብ", "Cloud sharing": "ኣብ ክላውድ ምክፋል", "Collaboration": "ሓባራዊ ስራሕ", "Pro workspaces": "ሞያዊ ቦታታት ስራሕ",
    "Color and scopes": "ሕብርን ስኮፕን", "Effects and finishing": "ተጽዕኖታትን መወዳእታን", "Audio mastering": "ማስተሪንግ ድምጺ", "Render queue": "ተራ ረንደር", "Production modules": "ሞዱላት ምፍራይ"
  },
  es: {
    "Language": "Idioma", "Record": "Grabar", "Edit": "Editar", "Captions": "Subtítulos", "Export": "Exportar", "Assets": "Recursos", "Share": "Compartir", "Suite": "Suite",
    "Inputs": "Entradas", "Screen": "Pantalla", "Webcam": "Cámara web", "Slides": "Diapositivas", "Microphone": "Micrófono",
    "Undo": "Deshacer", "Redo": "Rehacer", "Save project": "Guardar proyecto", "Load project": "Cargar proyecto", "Auto setup": "Configuración automática", "Start recording": "Iniciar grabación",
    "Timeline editor": "Editor de línea de tiempo", "Play timeline": "Reproducir línea de tiempo", "Import media": "Importar medios", "Relink media": "Revincular medios",
    "Clip inspector": "Inspector de clip", "Color and scopes": "Color y monitores", "Audio mastering": "Masterización de audio", "Render queue": "Cola de render"
  },
  fr: {
    "Language": "Langue", "Record": "Enregistrer", "Edit": "Monter", "Captions": "Sous-titres", "Export": "Exporter", "Assets": "Ressources", "Share": "Partager", "Suite": "Suite",
    "Inputs": "Entrées", "Screen": "Écran", "Webcam": "Webcam", "Slides": "Diapositives", "Microphone": "Microphone",
    "Undo": "Annuler", "Redo": "Rétablir", "Save project": "Enregistrer le projet", "Load project": "Charger le projet", "Auto setup": "Configuration auto", "Start recording": "Démarrer l'enregistrement",
    "Timeline editor": "Éditeur de timeline", "Play timeline": "Lire la timeline", "Import media": "Importer des médias", "Relink media": "Relier les médias",
    "Clip inspector": "Inspecteur de clip", "Color and scopes": "Couleur et scopes", "Audio mastering": "Mastering audio", "Render queue": "File de rendu"
  },
  ar: {
    "Language": "اللغة", "Record": "تسجيل", "Edit": "تحرير", "Captions": "تعليقات", "Export": "تصدير", "Assets": "الأصول", "Share": "مشاركة", "Suite": "الحزمة",
    "Inputs": "المدخلات", "Screen": "الشاشة", "Webcam": "كاميرا الويب", "Slides": "الشرائح", "Microphone": "الميكروفون",
    "Undo": "تراجع", "Redo": "إعادة", "Save project": "حفظ المشروع", "Load project": "تحميل المشروع", "Auto setup": "إعداد تلقائي", "Start recording": "بدء التسجيل",
    "Timeline editor": "محرر الخط الزمني", "Play timeline": "تشغيل الخط الزمني", "Import media": "استيراد الوسائط", "Relink media": "إعادة ربط الوسائط",
    "Clip inspector": "فاحص المقطع", "Color and scopes": "الألوان والمناظير", "Audio mastering": "إتقان الصوت", "Render queue": "قائمة التصيير"
  },
  zh: {
    "Language": "语言", "Record": "录制", "Edit": "编辑", "Captions": "字幕", "Export": "导出", "Assets": "素材", "Share": "共享", "Suite": "套件",
    "Inputs": "输入", "Screen": "屏幕", "Webcam": "摄像头", "Slides": "幻灯片", "Microphone": "麦克风",
    "Undo": "撤销", "Redo": "重做", "Save project": "保存项目", "Load project": "加载项目", "Auto setup": "自动设置", "Start recording": "开始录制",
    "Timeline editor": "时间线编辑器", "Play timeline": "播放时间线", "Import media": "导入媒体", "Relink media": "重新链接媒体",
    "Clip inspector": "片段检查器", "Color and scopes": "色彩与示波器", "Audio mastering": "音频母带", "Render queue": "渲染队列"
  },
  hi: {
    "Language": "भाषा", "Record": "रिकॉर्ड", "Edit": "संपादित करें", "Captions": "कैप्शन", "Export": "निर्यात", "Assets": "संपत्तियां", "Share": "साझा करें", "Suite": "सूट",
    "Inputs": "इनपुट", "Screen": "स्क्रीन", "Webcam": "वेबकैम", "Slides": "स्लाइड", "Microphone": "माइक्रोफोन",
    "Undo": "पूर्ववत", "Redo": "फिर करें", "Save project": "प्रोजेक्ट सहेजें", "Load project": "प्रोजेक्ट लोड करें", "Auto setup": "स्वचालित सेटअप", "Start recording": "रिकॉर्डिंग शुरू करें",
    "Timeline editor": "टाइमलाइन संपादक", "Play timeline": "टाइमलाइन चलाएं", "Import media": "मीडिया आयात करें", "Relink media": "मीडिया फिर लिंक करें",
    "Clip inspector": "क्लिप निरीक्षक", "Color and scopes": "रंग और स्कोप", "Audio mastering": "ऑडियो मास्टरिंग", "Render queue": "रेंडर कतार"
  }
};

const state = {
  screenStream: null,
  webcamStream: null,
  micStream: null,
  recorder: null,
  chunks: [],
  recordingUrl: "",
  recordingBlob: null,
  isRecording: false,
  startedAt: 0,
  timer: null,
  layout: "spotlight",
  transition: "Fade",
  slides: [],
  activeSlide: 0,
  markIn: 0,
  markOut: 0,
  cuts: [],
  caption: "Welcome to the session. Today we are walking through the product, the process, and the final next steps.",
  clips: [],
  selectedClipId: "",
  playhead: 0,
  playingTimeline: false,
  drag: null,
  exportUrl: "",
  history: [],
  future: [],
  autosaveTimer: null,
  exportCancel: false,
  audioContext: null,
  installPrompt: null,
  waveformSelection: { start: 0, end: 0 },
  shareUrl: "",
  account: { email: "", token: "" },
  syncTimer: null,
  gpuEngine: null,
  colorGrade: { exposure: 0, contrast: 1, saturation: 1, temperature: 0 },
  masterAudio: { compressor: 0.25, lufs: -14, eqLow: 0, eqHigh: 0 },
  finishing: {
    chromaKey: false,
    chromaColor: "#00ff00",
    mask: false,
    stabilize: false,
    speed: 1,
    lutName: "",
    nodes: [],
    qualifier: false,
    hdr: false,
    audioBuses: [],
  },
  effects: [],
  renderQueue: [],
  subscription: { intervalMonths: 6, approvedForAll: true, plan: "free-6-month", price: 0 },
  photo: {
    image: null,
    tool: "select",
    drawing: false,
    rotation: 0,
    flip: false,
    grayscale: false,
    sepia: false,
    crop: null,
    strokes: [],
    texts: [],
  },
};

const els = {
  canvas: document.querySelector("#mixCanvas"),
  languageSelect: document.querySelector("#languageSelect"),
  screenVideo: document.querySelector("#screenVideo"),
  webcamVideo: document.querySelector("#webcamVideo"),
  recordButton: document.querySelector("#recordButton"),
  quickSetup: document.querySelector("#quickSetup"),
  undoButton: document.querySelector("#undoButton"),
  redoButton: document.querySelector("#redoButton"),
  saveProject: document.querySelector("#saveProject"),
  loadProject: document.querySelector("#loadProject"),
  recordStatus: document.querySelector("#recordStatus"),
  recordDot: document.querySelector("#recordDot"),
  recordTime: document.querySelector("#recordTime"),
  playback: document.querySelector("#playback"),
  editCanvas: document.querySelector("#editCanvas"),
  sourceVideo: document.querySelector("#sourceVideo"),
  sourceAudio: document.querySelector("#sourceAudio"),
  assetInput: document.querySelector("#assetInput"),
  relinkInput: document.querySelector("#relinkInput"),
  slideInput: document.querySelector("#slideInput"),
  slideList: document.querySelector("#slideList"),
  slideCount: document.querySelector("#slideCount"),
  prevSlide: document.querySelector("#prevSlide"),
  nextSlide: document.querySelector("#nextSlide"),
  webcamSize: document.querySelector("#webcamSize"),
  captionStyle: document.querySelector("#captionStyle"),
  captionText: document.querySelector("#captionText"),
  captionStart: document.querySelector("#captionStart"),
  captionDuration: document.querySelector("#captionDuration"),
  captionBlocks: document.querySelector("#captionBlocks"),
  splitCaptions: document.querySelector("#splitCaptions"),
  applyCaption: document.querySelector("#applyCaption"),
  addTimedCaption: document.querySelector("#addTimedCaption"),
  photoInput: document.querySelector("#photoInput"),
  downloadPhoto: document.querySelector("#downloadPhoto"),
  photoCanvas: document.querySelector("#photoCanvas"),
  photoBrightness: document.querySelector("#photoBrightness"),
  photoContrast: document.querySelector("#photoContrast"),
  photoSaturation: document.querySelector("#photoSaturation"),
  photoBlur: document.querySelector("#photoBlur"),
  photoGrayscale: document.querySelector("#photoGrayscale"),
  photoSepia: document.querySelector("#photoSepia"),
  photoReset: document.querySelector("#photoReset"),
  photoBrushColor: document.querySelector("#photoBrushColor"),
  photoBrushSize: document.querySelector("#photoBrushSize"),
  photoText: document.querySelector("#photoText"),
  photoFormat: document.querySelector("#photoFormat"),
  rotatePhoto: document.querySelector("#rotatePhoto"),
  flipPhoto: document.querySelector("#flipPhoto"),
  cropPhoto: document.querySelector("#cropPhoto"),
  photoPresets: document.querySelector("#photoPresets"),
  timeline: document.querySelector("#timeline"),
  cutList: document.querySelector("#cutList"),
  markIn: document.querySelector("#markIn"),
  markOut: document.querySelector("#markOut"),
  addCut: document.querySelector("#addCut"),
  clearCuts: document.querySelector("#clearCuts"),
  splitClip: document.querySelector("#splitClip"),
  playTimeline: document.querySelector("#playTimeline"),
  transitionLength: document.querySelector("#transitionLength"),
  selectedClipName: document.querySelector("#selectedClipName"),
  clipStart: document.querySelector("#clipStart"),
  clipTrimIn: document.querySelector("#clipTrimIn"),
  clipTrimOut: document.querySelector("#clipTrimOut"),
  clipVolume: document.querySelector("#clipVolume"),
  clipMute: document.querySelector("#clipMute"),
  clipFadeIn: document.querySelector("#clipFadeIn"),
  clipFadeOut: document.querySelector("#clipFadeOut"),
  clipNoise: document.querySelector("#clipNoise"),
  clipCrop: document.querySelector("#clipCrop"),
  textSize: document.querySelector("#textSize"),
  textColor: document.querySelector("#textColor"),
  fillColor: document.querySelector("#fillColor"),
  textAlign: document.querySelector("#textAlign"),
  textBold: document.querySelector("#textBold"),
  addTextOverlay: document.querySelector("#addTextOverlay"),
  addLowerThird: document.querySelector("#addLowerThird"),
  addLogo: document.querySelector("#addLogo"),
  keyframeTime: document.querySelector("#keyframeTime"),
  keyframeZoom: document.querySelector("#keyframeZoom"),
  keyframePanX: document.querySelector("#keyframePanX"),
  keyframePanY: document.querySelector("#keyframePanY"),
  cursorHighlight: document.querySelector("#cursorHighlight"),
  clickRipple: document.querySelector("#clickRipple"),
  addKeyframe: document.querySelector("#addKeyframe"),
  addClickEffect: document.querySelector("#addClickEffect"),
  normalizeAudio: document.querySelector("#normalizeAudio"),
  silenceWaveform: document.querySelector("#silenceWaveform"),
  boostWaveform: document.querySelector("#boostWaveform"),
  fadeWaveform: document.querySelector("#fadeWaveform"),
  enableChromaKey: document.querySelector("#enableChromaKey"),
  chromaColor: document.querySelector("#chromaColor"),
  enableMask: document.querySelector("#enableMask"),
  enableStabilize: document.querySelector("#enableStabilize"),
  speedRamp: document.querySelector("#speedRamp"),
  waveformCanvas: document.querySelector("#waveformCanvas"),
  aiCaptionButton: document.querySelector("#aiCaptionButton"),
  formatSelect: document.querySelector("#formatSelect"),
  qualityRange: document.querySelector("#qualityRange"),
  downloadButton: document.querySelector("#downloadButton"),
  cancelExport: document.querySelector("#cancelExport"),
  exportProgress: document.querySelector("#exportProgress"),
  exportNote: document.querySelector("#exportNote"),
  permScreen: document.querySelector("#permScreen"),
  permCamera: document.querySelector("#permCamera"),
  permMic: document.querySelector("#permMic"),
  templateLibrary: document.querySelector("#templateLibrary"),
  assetLibrary: document.querySelector("#assetLibrary"),
  marketplaceSearch: document.querySelector("#marketplaceSearch"),
  searchMarketplace: document.querySelector("#searchMarketplace"),
  uploadMarketplaceAsset: document.querySelector("#uploadMarketplaceAsset"),
  engineStatus: document.querySelector("#engineStatus"),
  qaStatus: document.querySelector("#qaStatus"),
  runQaCheck: document.querySelector("#runQaCheck"),
  stressTimeline: document.querySelector("#stressTimeline"),
  accountEmail: document.querySelector("#accountEmail"),
  accountPassword: document.querySelector("#accountPassword"),
  createAccount: document.querySelector("#createAccount"),
  loginAccount: document.querySelector("#loginAccount"),
  resetPassword: document.querySelector("#resetPassword"),
  teamName: document.querySelector("#teamName"),
  teamMemberEmail: document.querySelector("#teamMemberEmail"),
  teamRole: document.querySelector("#teamRole"),
  addTeamMember: document.querySelector("#addTeamMember"),
  shareEndpoint: document.querySelector("#shareEndpoint"),
  createShareLink: document.querySelector("#createShareLink"),
  copyShareLink: document.querySelector("#copyShareLink"),
  syncProject: document.querySelector("#syncProject"),
  shareStatus: document.querySelector("#shareStatus"),
  commentBody: document.querySelector("#commentBody"),
  addComment: document.querySelector("#addComment"),
  collabActivity: document.querySelector("#collabActivity"),
  loadAudit: document.querySelector("#loadAudit"),
  loadRevisions: document.querySelector("#loadRevisions"),
  auditLog: document.querySelector("#auditLog"),
  workspaceMatrix: document.querySelector("#workspaceMatrix"),
  colorExposure: document.querySelector("#colorExposure"),
  colorContrast: document.querySelector("#colorContrast"),
  colorSaturation: document.querySelector("#colorSaturation"),
  colorTemperature: document.querySelector("#colorTemperature"),
  scopeCanvas: document.querySelector("#scopeCanvas"),
  lutInput: document.querySelector("#lutInput"),
  addColorNode: document.querySelector("#addColorNode"),
  addQualifier: document.querySelector("#addQualifier"),
  enableHdr: document.querySelector("#enableHdr"),
  effectsRack: document.querySelector("#effectsRack"),
  masterCompressor: document.querySelector("#masterCompressor"),
  masterLufs: document.querySelector("#masterLufs"),
  eqLow: document.querySelector("#eqLow"),
  eqHigh: document.querySelector("#eqHigh"),
  analyzeLoudness: document.querySelector("#analyzeLoudness"),
  noiseRepair: document.querySelector("#noiseRepair"),
  addAudioBus: document.querySelector("#addAudioBus"),
  renderQueue: document.querySelector("#renderQueue"),
  addRenderJob: document.querySelector("#addRenderJob"),
  clearRenderQueue: document.querySelector("#clearRenderQueue"),
  packageApp: document.querySelector("#packageApp"),
  productionModules: document.querySelector("#productionModules"),
  installApp: document.querySelector("#installApp"),
  openOffline: document.querySelector("#openOffline"),
  installStatus: document.querySelector("#installStatus"),
  installReadiness: document.querySelector("#installReadiness"),
  subscriptionModal: document.querySelector("#subscriptionModal"),
  subscriptionEmail: document.querySelector("#subscriptionEmail"),
  subscriptionAgree: document.querySelector("#subscriptionAgree"),
  renewSubscription: document.querySelector("#renewSubscription"),
  remindSubscription: document.querySelector("#remindSubscription"),
  subscriptionStatus: document.querySelector("#subscriptionStatus"),
  subscriptionNoticeStatus: document.querySelector("#subscriptionNoticeStatus"),
  enableSubscriptionNotifications: document.querySelector("#enableSubscriptionNotifications"),
  testSubscriptionNotification: document.querySelector("#testSubscriptionNotification"),
};

const ctx = els.canvas.getContext("2d");
const editCtx = els.editCanvas.getContext("2d");
const waveformCtx = els.waveformCanvas.getContext("2d");
const scopeCtx = els.scopeCanvas.getContext("2d");
const photoCtx = els.photoCanvas.getContext("2d");
const originalTextNodes = new WeakMap();
const checks = {
  record: document.querySelector("#checkRecord"),
  cuts: document.querySelector("#checkCuts"),
  captions: document.querySelector("#checkCaptions"),
  export: document.querySelector("#checkExport"),
};

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function populateLanguages() {
  els.languageSelect.innerHTML = "";
  LANGUAGE_OPTIONS.forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    els.languageSelect.append(option);
  });
  const requestedLanguage = new URLSearchParams(location.search).get("lang");
  els.languageSelect.value = requestedLanguage || localStorage.getItem("studiopro.language") || "en";
  if (!LANGUAGE_OPTIONS.some(([code]) => code === els.languageSelect.value)) els.languageSelect.value = "en";
}

function translatePhrase(text, language) {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (!normalized) return text;
  return UI_TRANSLATIONS[language]?.[normalized] || UI_TRANSLATIONS.en?.[normalized] || normalized;
}

function applyLanguage(language = els.languageSelect.value) {
  localStorage.setItem("studiopro.language", language);
  document.documentElement.lang = language;
  document.documentElement.dir = RTL_LANGUAGES.has(language) ? "rtl" : "ltr";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "OPTION"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("#timeline, #cutList, #captionBlocks, #templateLibrary, #assetLibrary, #effectsRack, #renderQueue, #collabActivity")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.textContent.trim());
    const original = originalTextNodes.get(node);
    node.textContent = node.textContent.replace(node.textContent.trim(), translatePhrase(original, language));
  });
}

function readSubscription() {
  try {
    const record = JSON.parse(localStorage.getItem("studiopro.subscription") || "{}");
    return {
      plan: state.subscription.plan,
      price: state.subscription.price,
      approvedForAll: state.subscription.approvedForAll,
      ...record,
    };
  } catch {
    return {
      plan: state.subscription.plan,
      price: state.subscription.price,
      approvedForAll: state.subscription.approvedForAll,
    };
  }
}

function writeSubscription(update) {
  const record = {
    ...readSubscription(),
    ...update,
    plan: state.subscription.plan,
    price: state.subscription.price,
    approvedForAll: true,
    approvedBy: "LJ Abrha",
    approvedAt: update.approvedAt || readSubscription().approvedAt || Date.now(),
  };
  localStorage.setItem("studiopro.subscription", JSON.stringify(record));
  renderSubscriptionNoticeStatus();
  return record;
}

function sixMonthsFrom(date) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + state.subscription.intervalMonths);
  return next.getTime();
}

function isSubscriptionDue() {
  const record = readSubscription();
  const renewalDue = !record.nextRenewalAt || Date.now() >= Number(record.nextRenewalAt);
  const promptAllowed = !record.nextPromptAt || Date.now() >= Number(record.nextPromptAt);
  return renewalDue && promptAllowed;
}

function showSubscriptionPrompt(force = false) {
  if (!force && !isSubscriptionDue()) return;
  const record = readSubscription();
  if (record.email) els.subscriptionEmail.value = record.email;
  els.subscriptionAgree.checked = false;
  els.subscriptionStatus.textContent = record.nextRenewalAt
    ? `Free renewal is due. Previous access ran until ${new Date(record.nextRenewalAt).toLocaleDateString()}.`
    : "Start your free 6-month studio subscription.";
  els.subscriptionModal.classList.add("active");
  notifySubscriptionDue(record);
}

function renewFreeSubscription() {
  if (!els.subscriptionAgree.checked) {
    els.subscriptionStatus.textContent = "Please confirm that this is a free 6-month renewal.";
    return;
  }
  const now = Date.now();
  const nextRenewalAt = sixMonthsFrom(now);
  writeSubscription({
    email: els.subscriptionEmail.value.trim(),
    renewedAt: now,
    nextRenewalAt,
    nextPromptAt: nextRenewalAt,
    lastNotifiedDueAt: 0,
  });
  els.subscriptionStatus.textContent = `Free subscription renewed until ${new Date(nextRenewalAt).toLocaleDateString()}.`;
  setTimeout(() => els.subscriptionModal.classList.remove("active"), 650);
}

function remindSubscriptionLater() {
  const nextReminder = Date.now() + 7 * 24 * 60 * 60 * 1000;
  writeSubscription({
    remindedAt: Date.now(),
    nextPromptAt: nextReminder,
  });
  els.subscriptionModal.classList.remove("active");
}

function renderSubscriptionNoticeStatus() {
  if (!els.subscriptionNoticeStatus) return;
  const record = readSubscription();
  const permission = "Notification" in window ? Notification.permission : "not supported";
  const nextDate = record.nextRenewalAt
    ? new Date(record.nextRenewalAt).toLocaleDateString()
    : "after your first free renewal";
  els.subscriptionNoticeStatus.textContent = `Free subscription is approved for all users by LJ Abrha. Notifications: ${permission}. Next 6-month renewal notice: ${nextDate}.`;
}

async function enableSubscriptionNotifications() {
  if (!("Notification" in window)) {
    els.subscriptionNoticeStatus.textContent = "This browser does not support desktop notifications.";
    return;
  }
  await registerServiceWorker();
  const permission = await Notification.requestPermission();
  writeSubscription({ notificationsEnabled: permission === "granted" });
  els.subscriptionNoticeStatus.textContent = permission === "granted"
    ? "Renewal notifications are enabled. The app will remind you every 6 months for the free subscription."
    : "Notifications were not enabled. You can still renew free access inside the app every 6 months.";
}

async function sendSubscriptionNotification(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return false;
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        tag: "i-studiopro-free-subscription",
        icon: "/icons/icon.svg",
        badge: "/icons/icon.svg",
        data: { url: location.origin },
      });
      return true;
    } catch {
      new Notification(title, { body, icon: "/icons/icon.svg" });
      return true;
    }
  }
  new Notification(title, { body, icon: "/icons/icon.svg" });
  return true;
}

async function notifySubscriptionDue(record = readSubscription(), force = false) {
  if (!("Notification" in window)) return;
  if (!force && (!record.notificationsEnabled || Notification.permission !== "granted")) return;
  const dueKey = Number(record.nextRenewalAt || 0);
  if (!force && Number(record.lastNotifiedDueAt || 0) === dueKey) return;
  const sent = await sendSubscriptionNotification(
    "Free subscription renewal",
    "I-StudioPro LJ Abrha free access is ready for your 6-month renewal. Open the app and approve it for all users."
  );
  if (sent) writeSubscription({ lastNotifiedDueAt: dueKey, lastNotifiedAt: Date.now() });
}

async function testSubscriptionNotification() {
  const record = readSubscription();
  if (!("Notification" in window)) {
    els.subscriptionNoticeStatus.textContent = "This browser does not support desktop notifications.";
    return;
  }
  if (!record.notificationsEnabled || Notification.permission !== "granted") {
    await enableSubscriptionNotifications();
  }
  await notifySubscriptionDue(readSubscription(), true);
}

function scheduleSubscriptionChecks() {
  renderSubscriptionNoticeStatus();
  if (isSubscriptionDue()) showSubscriptionPrompt();
  setInterval(() => {
    renderSubscriptionNoticeStatus();
    if (isSubscriptionDue()) showSubscriptionPrompt();
  }, 60 * 60 * 1000);
}

function secondsLabel(seconds) {
  return `${Math.max(0, seconds).toFixed(1)}s`;
}

function setStatus(label, live = false) {
  els.recordStatus.textContent = label;
  els.recordDot.classList.toggle("live", live);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function selectedClip() {
  return state.clips.find((clip) => clip.id === state.selectedClipId);
}

function trackDuration() {
  return Math.max(60, ...state.clips.map((clip) => clip.start + clip.duration + 5));
}

function projectSnapshot() {
  return {
    version: 2,
    layout: state.layout,
    transition: state.transition,
    activeSlide: state.activeSlide,
    markIn: state.markIn,
    markOut: state.markOut,
    cuts: state.cuts,
    caption: state.caption,
    clips: state.clips.map((clip) => ({
      ...clip,
      blob: null,
      image: null,
      audioBuffer: null,
      sourceMissing: Boolean(clip.blob || clip.url?.startsWith("blob:")),
    })),
    selectedClipId: state.selectedClipId,
    shareUrl: state.shareUrl,
    accountEmail: state.account.email,
    colorGrade: state.colorGrade,
    masterAudio: state.masterAudio,
    finishing: state.finishing,
    effects: state.effects,
    renderQueue: state.renderQueue,
  };
}

function applyProjectSnapshot(snapshot) {
  state.layout = snapshot.layout || "spotlight";
  state.transition = snapshot.transition || "Fade";
  state.activeSlide = snapshot.activeSlide || 0;
  state.markIn = snapshot.markIn || 0;
  state.markOut = snapshot.markOut || 0;
  state.cuts = snapshot.cuts || [];
  state.caption = snapshot.caption || state.caption;
  state.clips = (snapshot.clips || []).map((clip) => ({
    ...clip,
    blob: null,
    image: null,
    audioBuffer: null,
    waveform: clip.waveform || [],
  }));
  state.selectedClipId = snapshot.selectedClipId || state.clips[0]?.id || "";
  state.shareUrl = snapshot.shareUrl || "";
  state.colorGrade = snapshot.colorGrade || state.colorGrade;
  state.masterAudio = snapshot.masterAudio || state.masterAudio;
  state.finishing = snapshot.finishing || state.finishing;
  state.effects = snapshot.effects || [];
  state.renderQueue = snapshot.renderQueue || [];
  renderTimeline();
  renderInspector();
  renderWaveform();
  renderCuts();
  renderProSuite();
}

function detectEngines() {
  state.gpuEngine = {
    webCodecs: "VideoEncoder" in window && "VideoDecoder" in window,
    offscreenCanvas: "OffscreenCanvas" in window,
    webGpu: "gpu" in navigator,
  };
  const rows = [
    ["WebCodecs", state.gpuEngine.webCodecs],
    ["Offscreen GPU canvas", state.gpuEngine.offscreenCanvas],
    ["WebGPU", state.gpuEngine.webGpu],
    ["Web Audio mixing", "AudioContext" in window],
    ["MediaRecorder export", "MediaRecorder" in window],
    ["Local MP4 backend", location.protocol.startsWith("http")],
  ];
  els.engineStatus.innerHTML = "";
  rows.forEach(([label, ready]) => {
    const item = document.createElement("span");
    item.className = ready ? "ready" : "";
    item.textContent = `${label}: ${ready ? "ready" : "fallback"}`;
    els.engineStatus.append(item);
  });
}

function renderInstallReadiness() {
  const checks = [
    ["PWA manifest", Boolean(document.querySelector('link[rel="manifest"]'))],
    ["Service worker", "serviceWorker" in navigator],
    ["Standalone display", window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true],
    ["Secure capture context", window.isSecureContext],
    ["Touch editing", "ontouchstart" in window || navigator.maxTouchPoints > 0],
    ["Desktop packaging", true],
  ];
  els.installReadiness.innerHTML = "";
  checks.forEach(([label, ready]) => {
    const item = document.createElement("span");
    item.className = ready ? "ready" : "";
    item.textContent = `${label}: ${ready ? "ready" : "needs HTTPS or browser support"}`;
    els.installReadiness.append(item);
  });
  els.installStatus.textContent = state.installPrompt
    ? "This browser can install I-StudioPro LJ Abrha on this device."
    : "If no install prompt appears, use the browser menu: Install app or Add to Home Screen.";
}

function renderPhotoPresets() {
  els.photoPresets.innerHTML = "";
  PHOTO_PRESETS.forEach((preset) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "asset-card";
    card.innerHTML = `<strong>${preset.name}</strong><span>${preset.width} x ${preset.height}</span>`;
    card.addEventListener("click", () => applyPhotoPreset(preset));
    els.photoPresets.append(card);
  });
}

function photoPoint(event) {
  const rect = els.photoCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * els.photoCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * els.photoCanvas.height,
  };
}

function drawPhotoStudio() {
  photoCtx.clearRect(0, 0, els.photoCanvas.width, els.photoCanvas.height);
  photoCtx.fillStyle = "#111827";
  photoCtx.fillRect(0, 0, els.photoCanvas.width, els.photoCanvas.height);
  photoCtx.save();
  photoCtx.filter = [
    `brightness(${els.photoBrightness.value})`,
    `contrast(${els.photoContrast.value})`,
    `saturate(${els.photoSaturation.value})`,
    `blur(${els.photoBlur.value}px)`,
    state.photo.grayscale ? "grayscale(1)" : "",
    state.photo.sepia ? "sepia(1)" : "",
  ].filter(Boolean).join(" ");

  if (state.photo.image) {
    photoCtx.translate(els.photoCanvas.width / 2, els.photoCanvas.height / 2);
    photoCtx.rotate((state.photo.rotation * Math.PI) / 180);
    photoCtx.scale(state.photo.flip ? -1 : 1, 1);
    const image = state.photo.image;
    const ratio = Math.min(els.photoCanvas.width / image.naturalWidth, els.photoCanvas.height / image.naturalHeight);
    const width = image.naturalWidth * ratio;
    const height = image.naturalHeight * ratio;
    photoCtx.drawImage(image, -width / 2, -height / 2, width, height);
  } else {
    photoCtx.fillStyle = "white";
    photoCtx.font = "800 42px Inter, sans-serif";
    photoCtx.fillText("Import a photo to start editing", 70, els.photoCanvas.height / 2);
  }
  photoCtx.restore();

  state.photo.strokes.forEach((stroke) => {
    photoCtx.strokeStyle = stroke.color;
    photoCtx.lineWidth = stroke.size;
    photoCtx.lineCap = "round";
    photoCtx.beginPath();
    stroke.points.forEach((point, index) => {
      if (index === 0) photoCtx.moveTo(point.x, point.y);
      else photoCtx.lineTo(point.x, point.y);
    });
    photoCtx.stroke();
  });

  state.photo.texts.forEach((item) => {
    photoCtx.fillStyle = item.color;
    photoCtx.font = "800 56px Inter, sans-serif";
    photoCtx.fillText(item.text, item.x, item.y);
  });

  if (state.photo.crop) {
    const crop = state.photo.crop;
    photoCtx.strokeStyle = "#f2b84b";
    photoCtx.lineWidth = 4;
    photoCtx.setLineDash([12, 8]);
    photoCtx.strokeRect(crop.x, crop.y, crop.width, crop.height);
    photoCtx.setLineDash([]);
  }
}

function importPhoto(file) {
  if (!file) return;
  const image = new Image();
  image.onload = () => {
    state.photo.image = image;
    state.photo.strokes = [];
    state.photo.texts = [];
    drawPhotoStudio();
  };
  image.src = URL.createObjectURL(file);
}

function applyPhotoPreset(preset) {
  els.photoCanvas.width = preset.width;
  els.photoCanvas.height = preset.height;
  drawPhotoStudio();
}

function setPhotoTool(tool) {
  state.photo.tool = tool;
  document.querySelectorAll(".photo-tool").forEach((button) => button.classList.toggle("active", button.dataset.photoTool === tool));
}

function startPhotoPointer(event) {
  const point = photoPoint(event);
  if (state.photo.tool === "draw") {
    state.photo.drawing = true;
    state.photo.strokes.push({ color: els.photoBrushColor.value, size: Number(els.photoBrushSize.value), points: [point] });
  }
  if (state.photo.tool === "text") {
    state.photo.texts.push({ text: els.photoText.value, color: els.photoBrushColor.value, x: point.x, y: point.y });
  }
  if (state.photo.tool === "crop") {
    state.photo.crop = { x: point.x, y: point.y, width: 1, height: 1, startX: point.x, startY: point.y };
  }
  drawPhotoStudio();
}

function movePhotoPointer(event) {
  const point = photoPoint(event);
  if (state.photo.tool === "draw" && state.photo.drawing) {
    state.photo.strokes.at(-1).points.push(point);
  }
  if (state.photo.tool === "crop" && state.photo.crop) {
    state.photo.crop.x = Math.min(state.photo.crop.startX, point.x);
    state.photo.crop.y = Math.min(state.photo.crop.startY, point.y);
    state.photo.crop.width = Math.abs(point.x - state.photo.crop.startX);
    state.photo.crop.height = Math.abs(point.y - state.photo.crop.startY);
  }
  drawPhotoStudio();
}

function endPhotoPointer() {
  state.photo.drawing = false;
}

function cropPhoto() {
  const crop = state.photo.crop;
  if (!crop || crop.width < 8 || crop.height < 8) return;
  const imageData = photoCtx.getImageData(crop.x, crop.y, crop.width, crop.height);
  els.photoCanvas.width = crop.width;
  els.photoCanvas.height = crop.height;
  photoCtx.putImageData(imageData, 0, 0);
  const image = new Image();
  image.onload = () => {
    state.photo.image = image;
    state.photo.crop = null;
    state.photo.strokes = [];
    state.photo.texts = [];
    drawPhotoStudio();
  };
  image.src = els.photoCanvas.toDataURL("image/png");
}

function resetPhoto() {
  state.photo.rotation = 0;
  state.photo.flip = false;
  state.photo.grayscale = false;
  state.photo.sepia = false;
  state.photo.crop = null;
  state.photo.strokes = [];
  state.photo.texts = [];
  els.photoBrightness.value = 1;
  els.photoContrast.value = 1;
  els.photoSaturation.value = 1;
  els.photoBlur.value = 0;
  drawPhotoStudio();
}

function downloadPhoto() {
  drawPhotoStudio();
  const mime = els.photoFormat.value;
  const link = document.createElement("a");
  link.href = els.photoCanvas.toDataURL(mime, 0.92);
  link.download = `i-studiopro-photo.${mime.includes("jpeg") ? "jpg" : mime.split("/")[1]}`;
  link.click();
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    renderInstallReadiness();
    return;
  }
  try {
    await navigator.serviceWorker.register("/sw.js");
    els.installStatus.textContent = "Offline launch is enabled for the app shell.";
  } catch {
    els.installStatus.textContent = "Offline launch needs localhost or HTTPS browser support.";
  }
  renderInstallReadiness();
}

async function installApp() {
  if (!state.installPrompt) {
    els.installStatus.textContent = "Use your browser menu to install, or on iPhone/iPad use Share > Add to Home Screen.";
    return;
  }
  state.installPrompt.prompt();
  await state.installPrompt.userChoice;
  state.installPrompt = null;
  renderInstallReadiness();
}

function pushHistory() {
  state.history.push(JSON.stringify(projectSnapshot()));
  if (state.history.length > 80) state.history.shift();
  state.future = [];
  syncHistoryButtons();
}

function syncHistoryButtons() {
  els.undoButton.disabled = state.history.length === 0;
  els.redoButton.disabled = state.future.length === 0;
}

function commitChange() {
  scheduleAutosave();
  syncHistoryButtons();
}

function undo() {
  if (!state.history.length) return;
  state.future.push(JSON.stringify(projectSnapshot()));
  const snapshot = JSON.parse(state.history.pop());
  applyProjectSnapshot(snapshot);
  scheduleAutosave();
  syncHistoryButtons();
}

function redo() {
  if (!state.future.length) return;
  state.history.push(JSON.stringify(projectSnapshot()));
  const snapshot = JSON.parse(state.future.pop());
  applyProjectSnapshot(snapshot);
  scheduleAutosave();
  syncHistoryButtons();
}

function scheduleAutosave() {
  window.clearTimeout(state.autosaveTimer);
  state.autosaveTimer = window.setTimeout(() => {
    localStorage.setItem("studiopro.autosave", JSON.stringify(projectSnapshot()));
  }, 350);
}

function restoreAutosave() {
  const saved = localStorage.getItem("studiopro.autosave");
  if (!saved || state.clips.length) return;
  try {
    applyProjectSnapshot(JSON.parse(saved));
    els.exportNote.textContent = "Autosaved project restored. Re-import local media if a clip says its source is missing.";
  } catch {
    localStorage.removeItem("studiopro.autosave");
  }
}

function saveProjectFile() {
  const blob = new Blob([JSON.stringify(projectSnapshot(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "studiopro-project.studiopro";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function loadProjectFile(file) {
  if (!file) return;
  pushHistory();
  applyProjectSnapshot(JSON.parse(await file.text()));
  commitChange();
}

function setPermission(el, label, stateName) {
  el.textContent = label;
  el.classList.remove("ready", "blocked");
  if (stateName) el.classList.add(stateName);
}

function drawPlaceholder(targetCtx, x, y, width, height, title, detail, color = "#147d73") {
  const gradient = targetCtx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "#18212f");
  targetCtx.fillStyle = gradient;
  targetCtx.fillRect(x, y, width, height);
  targetCtx.fillStyle = "rgba(255,255,255,0.12)";
  for (let i = 0; i < 8; i += 1) {
    targetCtx.fillRect(x + 60 + i * 115, y + 90 + (i % 2) * 60, 72, 12);
  }
  targetCtx.fillStyle = "white";
  targetCtx.font = "700 48px Inter, sans-serif";
  targetCtx.fillText(title, x + 60, y + height - 120);
  targetCtx.font = "24px Inter, sans-serif";
  targetCtx.fillText(detail, x + 62, y + height - 78);
}

function roundedRect(targetCtx, x, y, width, height, radius) {
  targetCtx.beginPath();
  targetCtx.moveTo(x + radius, y);
  targetCtx.lineTo(x + width - radius, y);
  targetCtx.quadraticCurveTo(x + width, y, x + width, y + radius);
  targetCtx.lineTo(x + width, y + height - radius);
  targetCtx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  targetCtx.lineTo(x + radius, y + height);
  targetCtx.quadraticCurveTo(x, y + height, x, y + height - radius);
  targetCtx.lineTo(x, y + radius);
  targetCtx.quadraticCurveTo(x, y, x + radius, y);
  targetCtx.closePath();
}

function drawVideo(targetCtx, video, x, y, width, height, fallbackTitle, fallbackDetail, color) {
  if (video.srcObject && video.readyState >= 2) {
    targetCtx.drawImage(video, x, y, width, height);
    return;
  }
  drawPlaceholder(targetCtx, x, y, width, height, fallbackTitle, fallbackDetail, color);
}

function drawSlide(targetCtx, x, y, width, height) {
  const slide = state.slides[state.activeSlide];
  if (slide?.image?.complete) {
    targetCtx.fillStyle = "#f8fafc";
    targetCtx.fillRect(x, y, width, height);
    const imageRatio = slide.image.naturalWidth / slide.image.naturalHeight;
    const areaRatio = width / height;
    const drawWidth = imageRatio > areaRatio ? width : height * imageRatio;
    const drawHeight = imageRatio > areaRatio ? width / imageRatio : height;
    targetCtx.drawImage(slide.image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
    return;
  }
  drawPlaceholder(targetCtx, x, y, width, height, "Slide deck", "Drop in image slides and move through them live.", "#5f8fd8");
}

function drawCaption(targetCtx, text = state.caption, style = els.captionStyle.value) {
  if (style === "none" || !text.trim()) return;
  const maxWidth = 980;
  const y = style === "bar" ? 590 : 600;
  targetCtx.font = "700 28px Inter, sans-serif";
  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (targetCtx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  const visible = lines.slice(0, 2);
  targetCtx.fillStyle = style === "bar" ? "rgba(24,33,47,0.86)" : "rgba(24,33,47,0.68)";
  roundedRect(targetCtx, 110, y - 24, 1060, visible.length * 38 + 32, 18);
  targetCtx.fill();
  targetCtx.fillStyle = "white";
  visible.forEach((captionLine, index) => {
    targetCtx.fillText(captionLine, 640 - targetCtx.measureText(captionLine).width / 2, y + 18 + index * 38);
  });
}

function drawFrame() {
  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  ctx.fillStyle = "#111827";
  ctx.fillRect(0, 0, els.canvas.width, els.canvas.height);

  if (state.layout === "sideBySide") {
    drawVideo(ctx, els.screenVideo, 24, 72, 608, 520, "Screen", "Share an app, tab, or full display.", "#147d73");
    drawSlide(ctx, 648, 72, 608, 520);
  } else if (state.layout === "slidesFirst") {
    drawSlide(ctx, 36, 54, 856, 612);
    drawVideo(ctx, els.screenVideo, 920, 70, 320, 180, "Screen", "Live capture", "#147d73");
  } else {
    drawVideo(ctx, els.screenVideo, 0, 0, 1280, 720, "Screen capture", "Click Auto setup to connect screen, webcam, slides, and mic.", "#147d73");
    ctx.fillStyle = "rgba(17,24,39,0.42)";
    ctx.fillRect(0, 0, 1280, 720);
    drawSlide(ctx, 74, 82, 780, 438);
  }

  if (document.querySelector("#webcamToggle").checked) {
    const size = Number(els.webcamSize.value) / 100;
    const width = Math.round(1280 * size);
    const height = Math.round(width * 0.62);
    const x = 1280 - width - 46;
    const y = state.layout === "slidesFirst" ? 278 : 420;
    ctx.save();
    roundedRect(ctx, x, y, width, height, 26);
    ctx.clip();
    drawVideo(ctx, els.webcamVideo, x, y, width, height, "Webcam", "Camera off", "#e65f4f");
    ctx.restore();
    ctx.lineWidth = 7;
    ctx.strokeStyle = "white";
    roundedRect(ctx, x, y, width, height, 26);
    ctx.stroke();
  }

  drawCaption(ctx);
  requestAnimationFrame(drawFrame);
}

async function attachMedia() {
  setPermission(els.permScreen, "Screen waiting", "");
  setPermission(els.permCamera, "Camera waiting", "");
  setPermission(els.permMic, "Mic waiting", "");
  if (document.querySelector("#screenToggle").checked && !state.screenStream) {
    try {
      state.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      els.screenVideo.srcObject = state.screenStream;
      await els.screenVideo.play();
      setPermission(els.permScreen, "Screen connected", "ready");
    } catch {
      setPermission(els.permScreen, "Screen blocked", "blocked");
      throw new Error("Screen permission was blocked or dismissed.");
    }
  } else if (state.screenStream) {
    setPermission(els.permScreen, "Screen connected", "ready");
  }
  if (document.querySelector("#webcamToggle").checked && !state.webcamStream) {
    try {
      state.webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      els.webcamVideo.srcObject = state.webcamStream;
      await els.webcamVideo.play();
      setPermission(els.permCamera, "Camera connected", "ready");
    } catch {
      setPermission(els.permCamera, "Camera blocked", "blocked");
      throw new Error("Camera permission was blocked or dismissed.");
    }
  } else if (state.webcamStream) {
    setPermission(els.permCamera, "Camera connected", "ready");
  }
  if (document.querySelector("#micToggle").checked && !state.micStream) {
    try {
      state.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setPermission(els.permMic, "Mic connected", "ready");
    } catch {
      setPermission(els.permMic, "Mic blocked", "blocked");
      throw new Error("Microphone permission was blocked or dismissed.");
    }
  } else if (state.micStream) {
    setPermission(els.permMic, "Mic connected", "ready");
  }
}

function makeRecordingStream() {
  const canvasStream = els.canvas.captureStream(30);
  const tracks = [...canvasStream.getVideoTracks()];
  const audioTracks = [
    ...(state.micStream?.getAudioTracks() || []),
    ...(state.screenStream?.getAudioTracks() || []),
  ];
  return new MediaStream([...tracks, ...audioTracks]);
}

function supportedMime(preferMp4 = false) {
  const preferred = preferMp4
    ? ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm"]
    : ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  return preferred.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

async function startRecording() {
  try {
    await attachMedia();
    state.chunks = [];
    const stream = makeRecordingStream();
    const mimeType = supportedMime(false);
    state.recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
    state.recorder.ondataavailable = (event) => {
      if (event.data.size) state.chunks.push(event.data);
    };
    state.recorder.onstop = () => {
      state.recordingBlob = new Blob(state.chunks, { type: mimeType || "video/webm" });
      if (state.recordingUrl) URL.revokeObjectURL(state.recordingUrl);
      state.recordingUrl = URL.createObjectURL(state.recordingBlob);
      els.playback.src = state.recordingUrl;
      pushHistory();
      addMediaClip({ type: "video", name: "Recorded master", url: state.recordingUrl, blob: state.recordingBlob, duration: Math.max(2, (Date.now() - state.startedAt) / 1000) });
      analyzeWaveform(state.recordingBlob, state.selectedClipId);
      els.downloadButton.disabled = false;
      checks.record.classList.add("done");
      setStatus("Recorded");
      commitChange();
    };
    state.recorder.start(500);
    state.isRecording = true;
    state.startedAt = Date.now();
    els.recordButton.textContent = "Stop recording";
    els.recordButton.classList.add("recording");
    setStatus("Recording", true);
    state.timer = window.setInterval(() => {
      els.recordTime.textContent = formatTime(Date.now() - state.startedAt);
    }, 250);
  } catch (error) {
    setStatus("Permission needed");
    alert(`Could not start capture: ${error.message}`);
  }
}

function stopRecording() {
  state.recorder?.stop();
  state.isRecording = false;
  window.clearInterval(state.timer);
  els.recordButton.textContent = "Start recording";
  els.recordButton.classList.remove("recording");
  els.recordTime.textContent = formatTime(Date.now() - state.startedAt);
}

function renderSlides() {
  els.slideList.innerHTML = "";
  state.slides.forEach((slide, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `slide-thumb${index === state.activeSlide ? " active" : ""}`;
    item.textContent = `${index + 1}. ${slide.name}`;
    item.addEventListener("click", () => {
      state.activeSlide = index;
      renderSlides();
    });
    els.slideList.append(item);
  });
  els.slideCount.textContent = state.slides.length ? `${state.activeSlide + 1} / ${state.slides.length}` : "No slides";
}

function addSlides(files) {
  pushHistory();
  Array.from(files).forEach((file) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    state.slides.push({ name: file.name, image });
    addMediaClip({ type: "image", name: file.name, url: image.src, image, duration: DEFAULT_DURATION });
  });
  renderSlides();
  commitChange();
}

function mediaType(file) {
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("image/")) return "image";
  return "video";
}

function readMediaDuration(file, url, type) {
  return new Promise((resolve) => {
    if (type === "image") {
      resolve(DEFAULT_DURATION);
      return;
    }
    const el = document.createElement(type === "audio" ? "audio" : "video");
    el.preload = "metadata";
    el.src = url;
    el.onloadedmetadata = () => resolve(Number.isFinite(el.duration) ? Math.max(1, el.duration) : DEFAULT_DURATION);
    el.onerror = () => resolve(DEFAULT_DURATION);
  });
}

async function importAssets(files) {
  pushHistory();
  for (const file of Array.from(files)) {
    const type = mediaType(file);
    const url = URL.createObjectURL(file);
    const image = type === "image" ? await loadImage(url) : null;
    const duration = await readMediaDuration(file, url, type);
    const clip = addMediaClip({ type, name: file.name, url, blob: file, image, duration });
    if (type === "audio" || type === "video") analyzeWaveform(file, clip.id);
  }
  commitChange();
}

async function relinkAssets(files) {
  pushHistory();
  for (const file of Array.from(files)) {
    const match = state.clips.find((clip) => clip.name === file.name || clip.sourceMissing);
    if (!match) continue;
    const url = URL.createObjectURL(file);
    match.url = url;
    match.blob = file;
    match.sourceMissing = false;
    if (mediaType(file) === "image") match.image = await loadImage(url);
    if (mediaType(file) === "audio" || mediaType(file) === "video") analyzeWaveform(file, match.id);
  }
  renderTimeline();
  renderInspector();
  commitChange();
}

function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(image);
    image.src = url;
  });
}

function addMediaClip({ type, name, url = "", blob = null, image = null, duration = DEFAULT_DURATION, text = "" }) {
  const sameTrack = state.clips.filter((clip) => clip.type === type);
  const clip = {
    id: uid(type),
    type,
    name,
    url,
    blob,
    image,
    text,
    start: sameTrack.reduce((max, item) => Math.max(max, item.start + item.duration + 0.5), 0),
    duration,
    trimIn: 0,
    trimOut: duration,
    volume: 1,
    muted: false,
    fadeIn: 0,
    fadeOut: 0,
    noiseReduction: false,
    crop: "fit",
    textSize: type === "captions" ? 28 : 30,
    textColor: "#ffffff",
    fillColor: type === "captions" ? "#18212f" : "#18212f",
    textAlign: "left",
    textBold: true,
    keyframes: [],
    cursorEffects: [],
    waveformEdits: [],
    x: type === "image" ? 860 : 110,
    y: type === "image" ? 80 : 560,
    width: type === "image" ? 260 : 720,
    height: type === "image" ? 150 : 74,
    waveform: [],
    audioBuffer: null,
  };
  state.clips.push(clip);
  state.selectedClipId = clip.id;
  renderTimeline();
  renderInspector();
  renderWaveform();
  return clip;
}

function addTextClip(kind) {
  pushHistory();
  const isLower = kind === "lower";
  const isLogo = kind === "logo";
  addMediaClip({
    type: isLogo ? "image" : "text",
    name: isLogo ? "Logo badge" : isLower ? "Lower third" : "Text overlay",
    duration: DEFAULT_DURATION,
    text: isLogo ? "LOGO" : isLower ? "Speaker name / title" : "Double-click to edit text",
  });
  commitChange();
}

function applyTemplate(template) {
  pushHistory();
  if (template.clips === "demo") {
    addMediaClip({ type: "text", name: "Demo lower third", text: "Product walkthrough", duration: 7 });
    addMediaClip({ type: "captions", name: "Opening caption", text: "Here is the fastest way to understand the workflow.", duration: 5 });
  }
  if (template.clips === "lesson") {
    state.layout = "slidesFirst";
    addMediaClip({ type: "text", name: "Lesson title", text: "Lesson title", duration: 6 });
    addMediaClip({ type: "transitions", name: "Soft lesson fade", text: "Fade", duration: 1.2 });
  }
  if (template.clips === "sales") {
    addMediaClip({ type: "image", name: "Brand badge", text: "LOGO", duration: 12 });
    addMediaClip({ type: "text", name: "Sales CTA", text: "Book a follow-up", duration: 6 });
  }
  if (template.clips === "social") {
    const clip = addMediaClip({ type: "captions", name: "Bold social caption", text: "One clear idea per clip.", duration: 8 });
    clip.crop = "portrait";
    clip.textSize = 36;
    clip.fillColor = "#e65f4f";
  }
  renderTimeline();
  renderInspector();
  commitChange();
}

function applyAssetPreset(asset) {
  pushHistory();
  const clip = addMediaClip({
    type: asset.type,
    name: asset.name,
    text: asset.text,
    duration: DEFAULT_DURATION,
  });
  clip.fillColor = asset.fillColor;
  renderTimeline();
  renderInspector();
  commitChange();
}

function renderLibraries() {
  els.templateLibrary.innerHTML = "";
  TEMPLATES.forEach((template) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "asset-card";
    card.innerHTML = `<strong>${template.name}</strong><span>${template.detail}</span>`;
    card.addEventListener("click", () => applyTemplate(template));
    els.templateLibrary.append(card);
  });

  els.assetLibrary.innerHTML = "";
  ASSET_PRESETS.forEach((asset) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "asset-card";
    card.innerHTML = `<strong>${asset.name}</strong><span>${asset.type} preset</span>`;
    card.addEventListener("click", () => applyAssetPreset(asset));
    els.assetLibrary.append(card);
  });
}

function renderProSuite() {
  els.workspaceMatrix.innerHTML = "";
  PRO_WORKSPACES.forEach((workspace) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "module-card";
    card.innerHTML = `<strong>${workspace.name}</strong><span>${workspace.detail}</span>`;
    card.addEventListener("click", () => {
      renderCollabActivity(`${workspace.name} workspace selected`);
    });
    els.workspaceMatrix.append(card);
  });

  els.effectsRack.innerHTML = "";
  EFFECTS_PRESETS.forEach((effect) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "asset-card";
    card.innerHTML = `<strong>${effect}</strong><span>Apply as a project effect module</span>`;
    card.addEventListener("click", () => addEffect(effect));
    els.effectsRack.append(card);
  });

  els.productionModules.innerHTML = "";
  [
    "Multicam timeline model",
    "Proxy workflow registry",
    "Nested sequence metadata",
    "Adjustment-layer stack",
    "Color-scopes display",
    "Audio mastering bus",
    "Codec QA matrix",
    "Render queue manager",
  ].forEach((label) => {
    const row = document.createElement("span");
    row.className = "ready";
    row.textContent = `${label}: enabled`;
    els.productionModules.append(row);
  });

  renderRenderQueue();
  drawScopes();
}

function addEffect(effect) {
  pushHistory();
  state.effects.push({ id: uid("effect"), name: effect, enabled: true, clipId: state.selectedClipId || "project" });
  renderProSuite();
  commitChange();
}

function renderRenderQueue() {
  els.renderQueue.innerHTML = "";
  state.renderQueue.forEach((job, index) => {
    const item = document.createElement("div");
    item.className = "caption-item";
    item.textContent = `${index + 1}. ${job.name} - ${job.format} - ${job.status}`;
    els.renderQueue.append(item);
  });
}

function addRenderQueueJob() {
  pushHistory();
  state.renderQueue.push({
    id: uid("render"),
    name: `Master ${state.renderQueue.length + 1}`,
    format: els.formatSelect.value.toUpperCase(),
    status: "queued",
    createdAt: new Date().toISOString(),
  });
  renderRenderQueue();
  commitChange();
}

function clearRenderQueue() {
  pushHistory();
  state.renderQueue = [];
  renderRenderQueue();
  commitChange();
}

function updateColorGrade() {
  state.colorGrade = {
    exposure: Number(els.colorExposure.value),
    contrast: Number(els.colorContrast.value),
    saturation: Number(els.colorSaturation.value),
    temperature: Number(els.colorTemperature.value),
  };
  drawScopes();
  scheduleAutosave();
}

function updateMasterAudio() {
  state.masterAudio = {
    compressor: Number(els.masterCompressor.value),
    lufs: Number(els.masterLufs.value),
    eqLow: Number(els.eqLow.value),
    eqHigh: Number(els.eqHigh.value),
  };
  scheduleAutosave();
}

function updateFinishing() {
  state.finishing.chromaKey = els.enableChromaKey.checked;
  state.finishing.chromaColor = els.chromaColor.value;
  state.finishing.mask = els.enableMask.checked;
  state.finishing.stabilize = els.enableStabilize.checked;
  state.finishing.speed = Number(els.speedRamp.value);
  scheduleAutosave();
}

async function loadMarketplace() {
  const q = encodeURIComponent(els.marketplaceSearch.value || "");
  const response = await fetch(`/api/marketplace?q=${q}`);
  const result = await response.json();
  els.assetLibrary.innerHTML = "";
  result.items.forEach((asset) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "asset-card";
    card.innerHTML = `<strong>${asset.name}</strong><span>${asset.kind} - ${asset.license} subscription</span>`;
    card.addEventListener("click", () => applyAssetPreset({ name: asset.name, type: "text", text: asset.name, fillColor: "#147d73" }));
    els.assetLibrary.append(card);
  });
}

async function uploadMarketplaceAsset() {
  const name = prompt("Free marketplace asset name", "Community Template");
  if (!name) return;
  await fetch("/api/marketplace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, kind: "template", creator: state.account.email || "local creator" }),
  });
  await loadMarketplace();
}

async function resetPassword() {
  const response = await fetch("/api/password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: els.accountEmail.value }),
  });
  const result = await response.json();
  els.shareStatus.textContent = result.resetToken
    ? `Reset token created locally: ${result.resetToken}`
    : "If that account exists, a reset token was created.";
}

async function addTeamMember() {
  const response = await fetch("/api/team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ team: els.teamName.value, email: els.teamMemberEmail.value, role: els.teamRole.value }),
  });
  const result = await response.json();
  els.shareStatus.textContent = `Team ${els.teamName.value} updated with ${Object.keys(result.team.members).length} member(s).`;
  renderCollabActivity("Team permissions updated");
}

async function addComment() {
  const response = await fetch("/api/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project: state.account.email || "default", email: state.account.email || "guest", timecode: state.playhead, body: els.commentBody.value }),
  });
  const result = await response.json();
  renderCollabActivity(`Comment added: ${result.comments.at(-1).body}`);
}

async function loadAudit() {
  const response = await fetch("/api/audit");
  const result = await response.json();
  els.auditLog.innerHTML = "";
  result.events.slice(-12).reverse().forEach((event) => {
    const item = document.createElement("div");
    item.className = "caption-item";
    item.textContent = `${new Date(event.time * 1000).toLocaleString()} - ${event.email} - ${event.event}`;
    els.auditLog.append(item);
  });
}

async function loadRevisions() {
  const response = await fetch(`/api/revisions?project=${encodeURIComponent(state.account.email || "default")}`);
  const result = await response.json();
  els.auditLog.innerHTML = "";
  result.revisions.slice(-12).reverse().forEach((revision) => {
    const item = document.createElement("div");
    item.className = "caption-item";
    item.textContent = `Revision ${revision.id} - ${new Date(revision.updatedAt * 1000).toLocaleString()}`;
    els.auditLog.append(item);
  });
}

async function importLut(file) {
  if (!file) return;
  state.finishing.lutName = file.name;
  state.colorGrade.contrast = Math.min(2, state.colorGrade.contrast + 0.08);
  state.colorGrade.saturation = Math.min(2, state.colorGrade.saturation + 0.08);
  drawScopes();
  renderCollabActivity(`LUT imported: ${file.name}`);
  scheduleAutosave();
}

function addColorNode() {
  state.finishing.nodes.push({ id: uid("node"), type: "correction", enabled: true });
  renderCollabActivity(`Color node ${state.finishing.nodes.length} added`);
  scheduleAutosave();
}

function toggleQualifier() {
  state.finishing.qualifier = !state.finishing.qualifier;
  drawScopes();
  scheduleAutosave();
}

function toggleHdr() {
  state.finishing.hdr = !state.finishing.hdr;
  drawScopes();
  scheduleAutosave();
}

function analyzeLoudness() {
  const loudness = Number(els.masterLufs.value);
  renderCollabActivity(`Integrated loudness target set to ${loudness} LUFS`);
}

function noiseRepair() {
  const clip = selectedClip();
  if (clip) {
    clip.noiseReduction = true;
    renderInspector();
    renderWaveform();
  }
  renderCollabActivity("Noise repair chain enabled");
}

function addAudioBus() {
  state.finishing.audioBuses.push({ id: uid("bus"), name: `Bus ${state.finishing.audioBuses.length + 1}`, plugins: ["EQ", "Compressor", "Limiter"] });
  renderCollabActivity("Audio bus added");
  scheduleAutosave();
}

async function packageApp() {
  const response = await fetch("/api/package", { method: "POST" });
  const result = await response.json();
  if (result.url) window.open(result.url, "_blank");
}

function drawScopes() {
  const width = els.scopeCanvas.width;
  const height = els.scopeCanvas.height;
  scopeCtx.clearRect(0, 0, width, height);
  scopeCtx.fillStyle = "#111827";
  scopeCtx.fillRect(0, 0, width, height);
  scopeCtx.strokeStyle = "rgba(255,255,255,0.14)";
  for (let y = 20; y < height; y += 36) {
    scopeCtx.beginPath();
    scopeCtx.moveTo(0, y);
    scopeCtx.lineTo(width, y);
    scopeCtx.stroke();
  }
  const grade = state.colorGrade;
  ["#e65f4f", "#147d73", "#5f8fd8"].forEach((color, channel) => {
    scopeCtx.strokeStyle = color;
    scopeCtx.lineWidth = 2;
    scopeCtx.beginPath();
    for (let x = 0; x < width; x += 8) {
      const wave = Math.sin(x / 34 + channel) * 28 * grade.contrast;
      const sat = (channel - 1) * grade.saturation * 18;
      const temp = channel === 0 ? grade.temperature * -0.12 : channel === 2 ? grade.temperature * 0.12 : 0;
      const y = height / 2 + wave + sat + temp - grade.exposure * 35;
      if (x === 0) scopeCtx.moveTo(x, y);
      else scopeCtx.lineTo(x, y);
    }
    scopeCtx.stroke();
  });
  scopeCtx.fillStyle = "white";
  scopeCtx.font = "700 14px Inter, sans-serif";
  scopeCtx.fillText("RGB Parade / Waveform Preview", 18, 24);
}

function renderTimeline() {
  els.timeline.innerHTML = "";
  const duration = trackDuration();
  TRACKS.forEach((track) => {
    const row = document.createElement("div");
    row.className = "track-row";
    const label = document.createElement("div");
    label.className = "track-label";
    label.textContent = track;
    const lane = document.createElement("div");
    lane.className = "track-lane";
    lane.dataset.track = track;
    lane.style.width = `${duration * PX_PER_SECOND}px`;
    lane.addEventListener("dragover", (event) => event.preventDefault());
    lane.addEventListener("drop", (event) => handleDrop(event, track));

    state.clips.filter((clip) => clip.type === track).forEach((clip) => lane.append(renderClip(clip)));
    row.append(label, lane);
    els.timeline.append(row);
  });
  renderCuts();
}

function renderClip(clip) {
  const item = document.createElement("div");
  item.className = `clip clip-${clip.type}${clip.id === state.selectedClipId ? " selected" : ""}`;
  item.draggable = true;
  item.dataset.id = clip.id;
  item.style.left = `${clip.start * PX_PER_SECOND}px`;
  item.style.width = `${Math.max(3, clip.duration * PX_PER_SECOND)}px`;
  item.textContent = `${clip.name} ${secondsLabel(clip.trimIn)}-${secondsLabel(clip.trimOut)}`;
  item.addEventListener("click", () => {
    state.selectedClipId = clip.id;
    renderTimeline();
    renderInspector();
    renderWaveform();
  });
  item.addEventListener("dblclick", () => {
    if (clip.type === "text" || clip.type === "captions") {
      const next = prompt("Overlay text", clip.text || clip.name);
      if (next !== null) {
        clip.text = next;
        renderTimeline();
      }
    }
  });
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", clip.id);
  });
  ["left", "right"].forEach((side) => {
    const handle = document.createElement("span");
    handle.className = `clip-handle ${side}`;
    handle.addEventListener("pointerdown", (event) => startResize(event, clip.id, side));
    item.append(handle);
  });
  return item;
}

function handleDrop(event, track) {
  const id = event.dataTransfer.getData("text/plain");
  const clip = state.clips.find((item) => item.id === id);
  if (!clip) return;
  const lane = event.currentTarget;
  const left = event.clientX - lane.getBoundingClientRect().left + lane.scrollLeft;
  pushHistory();
  clip.start = Math.max(0, Math.round((left / PX_PER_SECOND) * 10) / 10);
  clip.type = track;
  state.selectedClipId = clip.id;
  renderTimeline();
  renderInspector();
  commitChange();
}

function startResize(event, id, side) {
  event.stopPropagation();
  const clip = state.clips.find((item) => item.id === id);
  pushHistory();
  state.drag = { id, side, startX: event.clientX, startStart: clip.start, startDuration: clip.duration };
}

window.addEventListener("pointermove", (event) => {
  if (!state.drag) return;
  const clip = state.clips.find((item) => item.id === state.drag.id);
  if (state.drag.side === "canvas") {
    const point = canvasPoint(event);
    clip.x = Math.max(0, Math.min(1280 - clip.width, state.drag.clipX + point.x - state.drag.startX));
    clip.y = Math.max(0, Math.min(720 - clip.height, state.drag.clipY + point.y - state.drag.startY));
    drawTimelineFrame(state.playhead || clip.start);
    return;
  }
  const delta = Math.round(((event.clientX - state.drag.startX) / PX_PER_SECOND) * 10) / 10;
  if (state.drag.side === "left") {
    const nextStart = Math.max(0, state.drag.startStart + delta);
    const end = state.drag.startStart + state.drag.startDuration;
    clip.start = Math.min(nextStart, end - 0.5);
    clip.duration = Math.max(0.5, end - clip.start);
    clip.trimIn = Math.min(clip.trimOut - 0.5, clip.trimIn + (clip.start - state.drag.startStart));
  } else {
    clip.duration = Math.max(0.5, state.drag.startDuration + delta);
    clip.trimOut = Math.max(clip.trimIn + 0.5, clip.trimIn + clip.duration);
  }
  renderTimeline();
  renderInspector();
});

window.addEventListener("pointerup", () => {
  if (state.drag) commitChange();
  state.drag = null;
});

function renderCuts() {
  els.cutList.innerHTML = "";
  state.cuts.forEach((cut, index) => {
    const item = document.createElement("div");
    item.className = "cut-item";
    item.textContent = `${index + 1}. Keep ${secondsLabel(cut.in)} to ${secondsLabel(cut.out)} - ${state.transition}`;
    els.cutList.append(item);
  });
  checks.cuts.classList.toggle("done", state.cuts.length > 0 || state.clips.length > 0);
}

function renderInspector() {
  const clip = selectedClip();
  const disabled = !clip;
  els.selectedClipName.textContent = clip ? `${clip.name} (${clip.type})` : "Select a timeline clip.";
  [els.clipStart, els.clipTrimIn, els.clipTrimOut, els.clipVolume, els.clipMute, els.clipFadeIn, els.clipFadeOut, els.clipNoise, els.clipCrop, els.textSize, els.textColor, els.fillColor, els.textAlign, els.textBold].forEach((input) => {
    input.disabled = disabled;
  });
  if (!clip) return;
  els.clipStart.value = clip.start.toFixed(1);
  els.clipTrimIn.value = clip.trimIn.toFixed(1);
  els.clipTrimOut.value = clip.trimOut.toFixed(1);
  els.clipVolume.value = clip.volume;
  els.clipMute.checked = clip.muted;
  els.clipFadeIn.value = clip.fadeIn;
  els.clipFadeOut.value = clip.fadeOut;
  els.clipNoise.checked = clip.noiseReduction;
  els.clipCrop.value = clip.crop;
  els.textSize.value = clip.textSize || 30;
  els.textColor.value = clip.textColor || "#ffffff";
  els.fillColor.value = clip.fillColor || "#18212f";
  els.textAlign.value = clip.textAlign || "left";
  els.textBold.checked = Boolean(clip.textBold);
  els.keyframeTime.value = state.playhead.toFixed(1);
  els.keyframeZoom.value = clip.keyframes?.at(-1)?.zoom || 1;
  els.keyframePanX.value = clip.keyframes?.at(-1)?.panX || 0;
  els.keyframePanY.value = clip.keyframes?.at(-1)?.panY || 0;
  els.cursorHighlight.checked = Boolean(clip.cursorEffects?.some((effect) => effect.kind === "highlight"));
  els.clickRipple.checked = Boolean(clip.cursorEffects?.some((effect) => effect.kind === "ripple"));
}

function updateClipFromInspector() {
  const clip = selectedClip();
  if (!clip) return;
  pushHistory();
  clip.start = Math.max(0, Number(els.clipStart.value) || 0);
  clip.trimIn = Math.max(0, Number(els.clipTrimIn.value) || 0);
  clip.trimOut = Math.max(clip.trimIn + 0.5, Number(els.clipTrimOut.value) || clip.trimIn + 0.5);
  clip.duration = Math.max(0.5, clip.trimOut - clip.trimIn);
  clip.volume = Number(els.clipVolume.value);
  clip.muted = els.clipMute.checked;
  clip.fadeIn = Number(els.clipFadeIn.value);
  clip.fadeOut = Number(els.clipFadeOut.value);
  clip.noiseReduction = els.clipNoise.checked;
  clip.crop = els.clipCrop.value;
  clip.textSize = Number(els.textSize.value) || 30;
  clip.textColor = els.textColor.value;
  clip.fillColor = els.fillColor.value;
  clip.textAlign = els.textAlign.value;
  clip.textBold = els.textBold.checked;
  renderTimeline();
  renderWaveform();
  commitChange();
}

async function analyzeWaveform(file, clipId) {
  try {
    const buffer = await file.arrayBuffer();
    const audioContext = state.audioContext || new AudioContext();
    state.audioContext = audioContext;
    const audioBuffer = await audioContext.decodeAudioData(buffer.slice(0));
    const data = audioBuffer.getChannelData(0);
    const samples = 240;
    const block = Math.floor(data.length / samples);
    const waveform = [];
    for (let i = 0; i < samples; i += 1) {
      let sum = 0;
      for (let j = 0; j < block; j += 1) sum += Math.abs(data[i * block + j] || 0);
      waveform.push(sum / block);
    }
    const clip = state.clips.find((item) => item.id === clipId);
    if (clip) {
      clip.waveform = waveform;
      clip.audioBuffer = audioBuffer;
    }
    renderWaveform();
  } catch {
    renderWaveform();
  }
}

function waveformFromAudioBuffer(audioBuffer, samples = 240) {
  const data = audioBuffer.getChannelData(0);
  const block = Math.max(1, Math.floor(data.length / samples));
  const waveform = [];
  for (let i = 0; i < samples; i += 1) {
    let sum = 0;
    for (let j = 0; j < block; j += 1) sum += Math.abs(data[i * block + j] || 0);
    waveform.push(sum / block);
  }
  return waveform;
}

function destructiveAudioEdit(clip, type, startRatio, endRatio) {
  if (!clip.audioBuffer) return false;
  const start = Math.floor(startRatio * clip.audioBuffer.length);
  const end = Math.max(start + 1, Math.floor(endRatio * clip.audioBuffer.length));
  for (let channel = 0; channel < clip.audioBuffer.numberOfChannels; channel += 1) {
    const data = clip.audioBuffer.getChannelData(channel);
    for (let i = start; i < end && i < data.length; i += 1) {
      const amount = (i - start) / Math.max(1, end - start);
      if (type === "silence") data[i] = 0;
      if (type === "boost") data[i] = Math.max(-1, Math.min(1, data[i] * 1.35));
      if (type === "fade") data[i] *= 1 - amount;
    }
  }
  clip.waveform = waveformFromAudioBuffer(clip.audioBuffer);
  return true;
}

function renderWaveform() {
  const clip = selectedClip();
  const width = els.waveformCanvas.width;
  const height = els.waveformCanvas.height;
  waveformCtx.clearRect(0, 0, width, height);
  waveformCtx.fillStyle = "#ffffff";
  waveformCtx.fillRect(0, 0, width, height);
  waveformCtx.strokeStyle = "#d9e0ea";
  waveformCtx.beginPath();
  waveformCtx.moveTo(0, height / 2);
  waveformCtx.lineTo(width, height / 2);
  waveformCtx.stroke();

  if (!clip || (clip.type !== "audio" && clip.type !== "video")) {
    waveformCtx.fillStyle = "#667085";
    waveformCtx.font = "700 18px Inter, sans-serif";
    waveformCtx.fillText("Select an audio or video clip to see waveform editing.", 24, 88);
    return;
  }

  const waveform = clip.waveform.length ? clip.waveform : Array.from({ length: 180 }, (_, i) => Math.abs(Math.sin(i / 7)) * 0.5);
  waveformCtx.strokeStyle = clip.noiseReduction ? "#147d73" : "#5f8fd8";
  waveformCtx.lineWidth = 2;
  waveform.forEach((value, index) => {
    const x = (index / waveform.length) * width;
    const gain = clip.muted ? 0 : clip.volume;
    const amp = Math.max(2, value * height * gain);
    waveformCtx.beginPath();
    waveformCtx.moveTo(x, height / 2 - amp / 2);
    waveformCtx.lineTo(x, height / 2 + amp / 2);
    waveformCtx.stroke();
  });
  waveformCtx.fillStyle = "rgba(230,95,79,0.18)";
  waveformCtx.fillRect(0, 0, (clip.fadeIn / Math.max(1, clip.duration)) * width, height);
  waveformCtx.fillRect(width - (clip.fadeOut / Math.max(1, clip.duration)) * width, 0, width, height);
  clip.waveformEdits?.forEach((edit) => {
    waveformCtx.fillStyle = edit.type === "silence" ? "rgba(230,95,79,0.28)" : "rgba(20,125,115,0.2)";
    waveformCtx.fillRect(edit.start * width, 0, Math.max(3, (edit.end - edit.start) * width), height);
  });
  const sel = state.waveformSelection;
  if (sel.end > sel.start) {
    waveformCtx.fillStyle = "rgba(242,184,75,0.28)";
    waveformCtx.fillRect(sel.start * width, 0, (sel.end - sel.start) * width, height);
  }
}

function setWaveformSelection(event) {
  const rect = els.waveformCanvas.getBoundingClientRect();
  const value = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  if (event.shiftKey) {
    state.waveformSelection.end = value;
  } else {
    state.waveformSelection.start = value;
    state.waveformSelection.end = value;
  }
  if (state.waveformSelection.end < state.waveformSelection.start) {
    [state.waveformSelection.start, state.waveformSelection.end] = [state.waveformSelection.end, state.waveformSelection.start];
  }
  renderWaveform();
}

function applyWaveformEdit(type) {
  const clip = selectedClip();
  if (!clip || (clip.type !== "audio" && clip.type !== "video")) return;
  const start = state.waveformSelection.start;
  const end = state.waveformSelection.end || Math.min(1, start + 0.08);
  pushHistory();
  clip.waveformEdits = clip.waveformEdits || [];
  clip.waveformEdits.push({ type, start, end });
  const edited = destructiveAudioEdit(clip, type, start, end);
  if (!edited && type === "silence") clip.volume = Math.max(0, clip.volume - 0.25);
  if (!edited && type === "boost") clip.volume = Math.min(1.5, clip.volume + 0.25);
  if (!edited && type === "fade") {
    clip.fadeIn = Math.max(clip.fadeIn, (end - start) * clip.duration);
    clip.fadeOut = Math.max(clip.fadeOut, (end - start) * clip.duration);
  }
  renderInspector();
  renderWaveform();
  commitChange();
}

function renderCaptionBlocks() {
  els.captionBlocks.innerHTML = "";
  const sentences = els.captionText.value.split(/(?<=[.!?])\s+/).map((text) => text.trim()).filter(Boolean);
  sentences.forEach((sentence, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "caption-item";
    item.textContent = `${index + 1}. ${sentence}`;
    item.addEventListener("click", () => {
      state.caption = sentence;
      pushHistory();
      const clip = addMediaClip({ type: "captions", name: `Caption ${index + 1}`, text: sentence, duration: 5 });
      clip.start = index * 5;
      clip.trimOut = clip.duration;
      commitChange();
    });
    els.captionBlocks.append(item);
  });
  checks.captions.classList.add("done");
}

function addTimedCaption() {
  pushHistory();
  const clip = addMediaClip({
    type: "captions",
    name: "Timed caption",
    text: els.captionText.value.trim() || state.caption,
    duration: Math.max(0.5, Number(els.captionDuration.value) || 4),
  });
  clip.start = Math.max(0, Number(els.captionStart.value) || 0);
  clip.trimOut = clip.duration;
  renderTimeline();
  renderInspector();
  checks.captions.classList.add("done");
  commitChange();
}

async function autoTimeCaptions() {
  const mediaClip = selectedClip() || state.clips.find((clip) => clip.blob && (clip.type === "audio" || clip.type === "video"));
  if (mediaClip?.blob) {
    try {
      els.exportNote.textContent = "Transcribing selected clip with the speech model endpoint...";
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": mediaClip.blob.type || "audio/webm" },
        body: mediaClip.blob,
      });
      const result = await response.json();
      const segments = result.transcript?.segments || [];
      if (segments.length) {
        pushHistory();
        segments.forEach((segment, index) => {
          const clip = addMediaClip({ type: "captions", name: `AI speech caption ${index + 1}`, text: segment.text.trim(), duration: Math.max(0.5, segment.end - segment.start) });
          clip.start = segment.start;
          clip.trimOut = clip.duration;
        });
        els.exportNote.textContent = `AI transcription connected through ${result.provider}.`;
        checks.captions.classList.add("done");
        renderTimeline();
        commitChange();
        return;
      }
      if (result.transcript?.text) els.captionText.value = result.transcript.text;
    } catch {
      els.exportNote.textContent = "Speech endpoint unavailable, using local timing fallback.";
    }
  }
  const sentences = els.captionText.value.split(/(?<=[.!?])\s+/).map((text) => text.trim()).filter(Boolean);
  if (!sentences.length) return;
  pushHistory();
  const total = Math.max(4, selectedClip()?.duration || trackDuration() || sentences.length * 4);
  const perCaption = Math.max(1.5, total / sentences.length);
  sentences.forEach((sentence, index) => {
    const clip = addMediaClip({ type: "captions", name: `AI caption ${index + 1}`, text: sentence, duration: perCaption });
    clip.start = index * perCaption;
    clip.trimOut = perCaption;
  });
  els.exportNote.textContent = "AI auto-timing simulated locally. Connect /api/transcribe for speech-to-text timing.";
  checks.captions.classList.add("done");
  renderTimeline();
  commitChange();
}

function addKeyframe() {
  const clip = selectedClip();
  if (!clip) return;
  pushHistory();
  clip.keyframes = clip.keyframes || [];
  clip.keyframes.push({
    time: Math.max(0, Number(els.keyframeTime.value) || state.playhead || clip.start),
    zoom: Number(els.keyframeZoom.value) || 1,
    panX: Number(els.keyframePanX.value) || 0,
    panY: Number(els.keyframePanY.value) || 0,
  });
  clip.keyframes.sort((a, b) => a.time - b.time);
  commitChange();
}

function addClickEffect() {
  const clip = selectedClip();
  if (!clip) return;
  pushHistory();
  clip.cursorEffects = clip.cursorEffects || [];
  if (els.cursorHighlight.checked) clip.cursorEffects.push({ kind: "highlight", time: state.playhead || clip.start, x: 640, y: 360 });
  if (els.clickRipple.checked) clip.cursorEffects.push({ kind: "ripple", time: state.playhead || clip.start, x: 640, y: 360 });
  commitChange();
}

function splitSelectedClip() {
  const clip = selectedClip();
  if (!clip || clip.duration <= 1) return;
  pushHistory();
  const splitAt = Math.min(clip.duration - 0.5, Math.max(0.5, (els.playback.currentTime || clip.duration / 2) - clip.start));
  const right = { ...clip, id: uid(clip.type), start: clip.start + splitAt, duration: clip.duration - splitAt, trimIn: clip.trimIn + splitAt };
  clip.duration = splitAt;
  clip.trimOut = clip.trimIn + splitAt;
  state.clips.push(right);
  state.selectedClipId = right.id;
  renderTimeline();
  renderInspector();
  commitChange();
}

function activeClipsAt(time) {
  return state.clips
    .filter((clip) => time >= clip.start && time <= clip.start + clip.duration)
    .sort((a, b) => TRACKS.indexOf(a.type) - TRACKS.indexOf(b.type));
}

function drawCroppedImage(targetCtx, source, clip, x, y, width, height) {
  const sourceWidth = source.videoWidth || source.naturalWidth || 1280;
  const sourceHeight = source.videoHeight || source.naturalHeight || 720;
  let drawX = x;
  let drawY = y;
  let drawW = width;
  let drawH = height;
  const sourceRatio = sourceWidth / sourceHeight;
  const destRatio = width / height;
  if (clip.crop === "fill" || clip.crop === "square" || clip.crop === "portrait") {
    const targetRatio = clip.crop === "square" ? 1 : clip.crop === "portrait" ? 9 / 16 : destRatio;
    drawW = sourceRatio > targetRatio ? height * sourceRatio : width;
    drawH = sourceRatio > targetRatio ? height : width / sourceRatio;
    drawX = x + (width - drawW) / 2;
    drawY = y + (height - drawH) / 2;
  }
  targetCtx.drawImage(source, drawX, drawY, drawW, drawH);
}

function interpolatedKeyframe(clip, time) {
  const frames = clip.keyframes || [];
  if (!frames.length) return { zoom: 1, panX: 0, panY: 0 };
  const before = [...frames].reverse().find((frame) => frame.time <= time) || frames[0];
  const after = frames.find((frame) => frame.time >= time) || before;
  if (before === after) return before;
  const amount = (time - before.time) / Math.max(0.001, after.time - before.time);
  return {
    zoom: before.zoom + (after.zoom - before.zoom) * amount,
    panX: before.panX + (after.panX - before.panX) * amount,
    panY: before.panY + (after.panY - before.panY) * amount,
  };
}

function drawCursorEffects(targetCtx, clip, time) {
  (clip.cursorEffects || []).forEach((effect) => {
    const age = Math.abs(time - effect.time);
    if (age > 1.2) return;
    targetCtx.save();
    targetCtx.globalAlpha = Math.max(0, 1 - age / 1.2);
    targetCtx.strokeStyle = effect.kind === "ripple" ? "#e65f4f" : "#f2b84b";
    targetCtx.lineWidth = 8;
    targetCtx.beginPath();
    targetCtx.arc(effect.x, effect.y, effect.kind === "ripple" ? 32 + age * 70 : 44, 0, Math.PI * 2);
    targetCtx.stroke();
    targetCtx.restore();
  });
}

function drawOverlay(targetCtx, clip) {
  const text = clip.text || clip.name;
  targetCtx.fillStyle = clip.fillColor || "#18212f";
  roundedRect(targetCtx, clip.x, clip.y, clip.width, clip.height, 16);
  targetCtx.fill();
  targetCtx.fillStyle = clip.textColor || "white";
  targetCtx.font = `${clip.textBold ? "800" : "500"} ${clip.textSize || 30}px Inter, sans-serif`;
  targetCtx.textAlign = clip.textAlign || "left";
  const x = clip.textAlign === "center" ? clip.x + clip.width / 2 : clip.textAlign === "right" ? clip.x + clip.width - 24 : clip.x + 24;
  targetCtx.fillText(text, x, clip.y + clip.height / 2 + (clip.textSize || 30) / 3);
  targetCtx.textAlign = "left";
}

function canvasPoint(event) {
  const rect = els.editCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 1280,
    y: ((event.clientY - rect.top) / rect.height) * 720,
  };
}

function selectableOverlayAt(point) {
  return [...state.clips].reverse().find((clip) => {
    if (!["image", "text", "captions"].includes(clip.type) && !clip.text) return false;
    return point.x >= clip.x && point.x <= clip.x + clip.width && point.y >= clip.y && point.y <= clip.y + clip.height;
  });
}

function startCanvasDrag(event) {
  const point = canvasPoint(event);
  const clip = selectableOverlayAt(point);
  if (!clip) return;
  pushHistory();
  state.selectedClipId = clip.id;
  state.drag = {
    id: clip.id,
    side: "canvas",
    startX: point.x,
    startY: point.y,
    clipX: clip.x,
    clipY: clip.y,
  };
  renderTimeline();
  renderInspector();
}

async function prepareSource(clip, time) {
  if (clip.type === "video") {
    if (els.sourceVideo.src !== clip.url) els.sourceVideo.src = clip.url;
    const target = Math.min(clip.trimOut, clip.trimIn + (time - clip.start));
    if (Math.abs(els.sourceVideo.currentTime - target) > 0.25) els.sourceVideo.currentTime = target;
    if (state.playingTimeline) await els.sourceVideo.play().catch(() => {});
    els.sourceVideo.volume = clip.muted ? 0 : Math.min(1, clip.volume);
  }
  if (clip.type === "audio") {
    if (els.sourceAudio.src !== clip.url) els.sourceAudio.src = clip.url;
    const target = Math.min(clip.trimOut, clip.trimIn + (time - clip.start));
    if (Math.abs(els.sourceAudio.currentTime - target) > 0.25) els.sourceAudio.currentTime = target;
    els.sourceAudio.volume = clip.muted ? 0 : Math.min(1, clip.volume);
    if (state.playingTimeline) await els.sourceAudio.play().catch(() => {});
  }
}

async function drawTimelineFrame(time, targetCtx = editCtx) {
  targetCtx.fillStyle = "#111827";
  targetCtx.fillRect(0, 0, 1280, 720);
  const clips = activeClipsAt(time);
  for (const clip of clips) {
    await prepareSource(clip, time);
    const local = time - clip.start;
    let alpha = 1;
    if (clip.fadeIn > 0) alpha = Math.min(alpha, local / clip.fadeIn);
    if (clip.fadeOut > 0) alpha = Math.min(alpha, (clip.duration - local) / clip.fadeOut);
    targetCtx.save();
    targetCtx.globalAlpha = Math.max(0, Math.min(1, alpha));
    const motion = interpolatedKeyframe(clip, time);
    if (motion.zoom !== 1 || motion.panX || motion.panY) {
      targetCtx.translate(640 + motion.panX, 360 + motion.panY);
      targetCtx.scale(motion.zoom, motion.zoom);
      targetCtx.translate(-640, -360);
    }
    if (clip.type === "video" && els.sourceVideo.readyState >= 2) {
      drawCroppedImage(targetCtx, els.sourceVideo, clip, 0, 0, 1280, 720);
    } else if (clip.type === "image" && clip.image?.complete && !clip.text) {
      drawCroppedImage(targetCtx, clip.image, clip, clip.x, clip.y, clip.width, clip.height);
    } else if (clip.type === "text" || clip.type === "captions" || clip.text) {
      drawOverlay(targetCtx, clip);
    }
    drawCursorEffects(targetCtx, clip, time);
    targetCtx.restore();
  }
  applyColorGrade(targetCtx);
}

function applyColorGrade(targetCtx) {
  const grade = state.colorGrade;
  const brightness = 1 + grade.exposure * 0.18;
  targetCtx.save();
  targetCtx.globalCompositeOperation = "source-atop";
  if (grade.temperature !== 0) {
    targetCtx.fillStyle = grade.temperature > 0
      ? `rgba(242,184,75,${Math.min(0.18, grade.temperature / 600)})`
      : `rgba(95,143,216,${Math.min(0.18, Math.abs(grade.temperature) / 600)})`;
    targetCtx.fillRect(0, 0, 1280, 720);
  }
  if (brightness !== 1) {
    targetCtx.fillStyle = brightness > 1
      ? `rgba(255,255,255,${Math.min(0.22, brightness - 1)})`
      : `rgba(0,0,0,${Math.min(0.22, 1 - brightness)})`;
    targetCtx.fillRect(0, 0, 1280, 720);
  }
  targetCtx.restore();
  applyFinishingEffects(targetCtx);
}

function applyFinishingEffects(targetCtx) {
  const finishing = state.finishing;
  if (finishing.mask) {
    targetCtx.save();
    targetCtx.globalCompositeOperation = "destination-in";
    targetCtx.fillStyle = "black";
    targetCtx.beginPath();
    targetCtx.ellipse(640, 360, 520, 292, 0, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.restore();
  }
  if (finishing.hdr) {
    targetCtx.save();
    targetCtx.globalCompositeOperation = "screen";
    targetCtx.fillStyle = "rgba(255,255,255,0.06)";
    targetCtx.fillRect(0, 0, 1280, 720);
    targetCtx.restore();
  }
  if (finishing.qualifier) {
    targetCtx.save();
    targetCtx.strokeStyle = "rgba(242,184,75,0.85)";
    targetCtx.lineWidth = 6;
    targetCtx.strokeRect(96, 72, 1088, 576);
    targetCtx.restore();
  }
}

const timelineRenderer = {
  async renderFrame(time, targetCtx) {
    await drawTimelineFrame(time, targetCtx);
  },
  selectedRanges() {
    return state.cuts.length ? state.cuts : [{ in: 0, out: trackDuration() }];
  },
  totalSelectedSeconds() {
    return this.selectedRanges().reduce((total, range) => total + Math.max(0, range.out - range.in), 0);
  },
};

function scheduleAudioMix(destination, ranges) {
  const audioContext = destination.context;
  const exportStart = audioContext.currentTime + 0.15;
  let rangeOffset = 0;
  ranges.forEach((range) => {
    state.clips.forEach((clip) => {
      if (!clip.audioBuffer || clip.muted) return;
      const start = Math.max(range.in, clip.start);
      const end = Math.min(range.out, clip.start + clip.duration);
      if (end <= start) return;
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = clip.audioBuffer;
      source.connect(gain);
      gain.connect(destination);
      const when = exportStart + rangeOffset + (start - range.in);
      const offset = Math.max(0, clip.trimIn + start - clip.start);
      const duration = Math.max(0.1, end - start);
      const baseGain = clip.noiseReduction ? clip.volume * 0.85 : clip.volume;
      gain.gain.setValueAtTime(baseGain, when);
      if (clip.fadeIn > 0) {
        gain.gain.setValueAtTime(0, when);
        gain.gain.linearRampToValueAtTime(baseGain, when + Math.min(clip.fadeIn, duration));
      }
      if (clip.fadeOut > 0) {
        gain.gain.setValueAtTime(baseGain, when + Math.max(0, duration - clip.fadeOut));
        gain.gain.linearRampToValueAtTime(0, when + duration);
      }
      source.start(when, offset, duration);
    });
    rangeOffset += Math.max(0, range.out - range.in);
  });
}

async function encodeMp4WithBackend(webmBlob) {
  const response = await fetch("/api/encode-mp4", {
    method: "POST",
    headers: { "Content-Type": "video/webm" },
    body: webmBlob,
  });
  if (!response.ok) throw new Error("MP4 backend unavailable");
  return response.blob();
}

function downloadBlob(blob, extension) {
  if (state.exportUrl) URL.revokeObjectURL(state.exportUrl);
  state.exportUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = state.exportUrl;
  link.download = `studiopro-export.${extension}`;
  link.click();
}

async function createSharePackage() {
  const payload = projectSnapshot();
  payload.createdAt = new Date().toISOString();
  payload.collaboration = {
    mode: "portable-package",
    note: "Connect the share endpoint to a cloud database/storage service for real-time collaboration.",
  };
  try {
    const response = await fetch(els.shareEndpoint.value, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const result = await response.json();
      state.shareUrl = new URL(result.url, location.href).href;
      els.shareStatus.textContent = `Cloud package published: ${state.shareUrl}`;
      renderCollabActivity("Cloud package published");
      return;
    }
  } catch {
    // Fall back to a local object URL below.
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  state.shareUrl = URL.createObjectURL(blob);
  els.shareStatus.textContent = "Share package created. Team members can load it as a StudioPro project.";
  renderCollabActivity("Share package created");
}

function copyShareLink() {
  if (!state.shareUrl) createSharePackage();
  navigator.clipboard?.writeText(state.shareUrl);
  els.shareStatus.textContent = "Share package link copied locally.";
  renderCollabActivity("Share link copied");
}

function renderCollabActivity(message = "Project opened") {
  const item = document.createElement("div");
  item.className = "caption-item";
  item.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
  els.collabActivity.prepend(item);
}

async function accountRequest(path) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: els.accountEmail.value, password: els.accountPassword.value }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Account request failed");
  return payload;
}

async function createAccount() {
  try {
    const payload = await accountRequest("/api/register");
    state.account.email = payload.email;
    els.shareStatus.textContent = `Account created for ${payload.email}.`;
    renderCollabActivity("Account created");
  } catch (error) {
    els.shareStatus.textContent = error.message;
  }
}

async function loginAccount() {
  try {
    const payload = await accountRequest("/api/login");
    state.account = { email: payload.email, token: payload.token };
    els.shareStatus.textContent = `Logged in as ${payload.email}. Live sync is running.`;
    renderCollabActivity("Logged in");
    startLiveSync();
  } catch (error) {
    els.shareStatus.textContent = error.message;
  }
}

async function syncProjectNow() {
  const payload = {
    project: state.account.email || "default",
    token: state.account.token,
    email: state.account.email || "guest",
    baseUpdatedAt: Number(localStorage.getItem("studiopro.lastSync") || 0),
    payload: projectSnapshot(),
  };
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("studiopro.lastSync", result.updatedAt || Date.now() / 1000);
    els.shareStatus.textContent = "Project synced to the local collaboration server.";
    renderCollabActivity("Project synced");
  }
}

function startLiveSync() {
  window.clearInterval(state.syncTimer);
  state.syncTimer = window.setInterval(syncProjectNow, 5000);
}

async function runQaCheck() {
  els.qaStatus.innerHTML = "";
  const response = await fetch("/api/qa");
  const qa = await response.json();
  const rows = [
    ["FFmpeg MP4 encoder", qa.ffmpeg],
    ["Long project virtual timeline", qa.longProjectReady],
    ...qa.codecs.map((codec) => [`Codec ${codec.name}`, codec.ready]),
  ];
  rows.forEach(([label, ready]) => {
    const item = document.createElement("span");
    item.className = ready ? "ready" : "";
    item.textContent = `${label}: ${ready ? "ready" : "missing"}`;
    els.qaStatus.append(item);
  });
}

function stressTimeline() {
  pushHistory();
  for (let i = 0; i < 80; i += 1) {
    const clip = addMediaClip({ type: i % 3 === 0 ? "text" : "captions", name: `QA marker ${i + 1}`, text: `Marker ${i + 1}`, duration: 2 });
    clip.start = i * 3;
    clip.x = 80 + (i % 6) * 90;
    clip.y = 80 + (i % 5) * 70;
  }
  renderTimeline();
  commitChange();
  renderCollabActivity("Long-project stress timeline generated");
}

function playTimeline() {
  state.playingTimeline = !state.playingTimeline;
  els.playTimeline.textContent = state.playingTimeline ? "Pause timeline" : "Play timeline";
  els.playback.style.display = state.playingTimeline ? "none" : "block";
  els.editCanvas.style.display = state.playingTimeline ? "block" : "none";
  if (!state.playingTimeline) {
    els.sourceVideo.pause();
    els.sourceAudio.pause();
    return;
  }
  const start = performance.now() - state.playhead * 1000;
  const tick = async () => {
    if (!state.playingTimeline) return;
    state.playhead = (performance.now() - start) / 1000;
    if (state.playhead > trackDuration()) {
      state.playingTimeline = false;
      els.playTimeline.textContent = "Play timeline";
      return;
    }
    await drawTimelineFrame(state.playhead);
    requestAnimationFrame(tick);
  };
  tick();
}

async function exportTimeline() {
  if (!state.clips.length) return;
  state.exportCancel = false;
  els.downloadButton.disabled = true;
  els.cancelExport.disabled = false;
  els.downloadButton.textContent = "Exporting...";
  els.exportProgress.value = 0;
  const preferMp4 = els.formatSelect.value === "mp4";
  const nativeMimeType = supportedMime(preferMp4);
  const mimeType = preferMp4 && !nativeMimeType.includes("mp4") ? supportedMime(false) : nativeMimeType;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = 1280;
  exportCanvas.height = 720;
  const exportCtx = exportCanvas.getContext("2d");
  const stream = exportCanvas.captureStream(30);
  const audioContext = new AudioContext();
  const destination = audioContext.createMediaStreamDestination();
  destination.stream.getAudioTracks().forEach((track) => stream.addTrack(track));
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType, videoBitsPerSecond: Number(els.qualityRange.value) * 80000 } : {});
  const chunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data);
  };
  const done = new Promise((resolve) => {
    recorder.onstop = resolve;
  });
  recorder.start(250);
  const ranges = timelineRenderer.selectedRanges();
  const totalSeconds = Math.max(0.1, timelineRenderer.totalSelectedSeconds());
  scheduleAudioMix(destination, ranges);
  let renderedSeconds = 0;
  for (const range of ranges) {
    for (let time = range.in; time < range.out; time += 1 / 30) {
      if (state.exportCancel) {
        recorder.stop();
        await done;
        await audioContext.close();
        els.downloadButton.disabled = false;
        els.cancelExport.disabled = true;
        els.downloadButton.textContent = "Export selected timeline";
        els.exportNote.textContent = "Export cancelled.";
        return;
      }
      await timelineRenderer.renderFrame(time, exportCtx);
      renderedSeconds += 1 / 30;
      els.exportProgress.value = Math.min(100, (renderedSeconds / totalSeconds) * 100);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  recorder.stop();
  await done;
  await audioContext.close();
  const webmBlob = new Blob(chunks, { type: mimeType || "video/webm" });
  let finalBlob = webmBlob;
  let extension = mimeType.includes("mp4") ? "mp4" : "webm";
  if (preferMp4 && extension !== "mp4") {
    try {
      els.exportNote.textContent = "Sending WebM render to local FFmpeg backend for MP4 encoding...";
      finalBlob = await encodeMp4WithBackend(webmBlob);
      extension = "mp4";
    } catch {
      els.exportNote.textContent = "MP4 needs the optional FFmpeg backend. Exported WebM instead.";
    }
  }
  downloadBlob(finalBlob, extension);
  checks.export.classList.add("done");
  els.downloadButton.disabled = false;
  els.cancelExport.disabled = true;
  els.downloadButton.textContent = "Export selected timeline";
  els.exportProgress.value = 100;
  els.exportNote.textContent = extension === "mp4"
    ? "Exported MP4 using native browser support or the local FFmpeg backend."
    : "Exported WebM with the browser renderer. Use the optional FFmpeg backend for guaranteed MP4.";
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-view-panel="${button.dataset.view}"]`).classList.add("active");
  });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  state.installPrompt = event;
  renderInstallReadiness();
});

window.addEventListener("appinstalled", () => {
  state.installPrompt = null;
  els.installStatus.textContent = "I-StudioPro LJ Abrha is installed on this device.";
  renderInstallReadiness();
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.layout = button.dataset.layout;
  });
});

document.querySelectorAll(".transition").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".transition").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.transition = button.dataset.transition;
    const duration = Number(els.transitionLength.value);
    pushHistory();
    addMediaClip({ type: "transitions", name: `${state.transition} transition`, duration: Math.max(0.5, duration), text: state.transition });
    commitChange();
  });
});

els.quickSetup.addEventListener("click", attachMedia);
els.undoButton.addEventListener("click", undo);
els.redoButton.addEventListener("click", redo);
els.saveProject.addEventListener("click", saveProjectFile);
els.loadProject.addEventListener("change", (event) => loadProjectFile(event.target.files[0]));
els.recordButton.addEventListener("click", () => (state.isRecording ? stopRecording() : startRecording()));
els.slideInput.addEventListener("change", (event) => addSlides(event.target.files));
els.assetInput.addEventListener("change", (event) => importAssets(event.target.files));
els.relinkInput.addEventListener("change", (event) => relinkAssets(event.target.files));
els.photoInput.addEventListener("change", (event) => importPhoto(event.target.files[0]));
[els.photoBrightness, els.photoContrast, els.photoSaturation, els.photoBlur].forEach((input) => {
  input.addEventListener("input", drawPhotoStudio);
});
els.photoGrayscale.addEventListener("click", () => {
  state.photo.grayscale = !state.photo.grayscale;
  drawPhotoStudio();
});
els.photoSepia.addEventListener("click", () => {
  state.photo.sepia = !state.photo.sepia;
  drawPhotoStudio();
});
els.photoReset.addEventListener("click", resetPhoto);
els.rotatePhoto.addEventListener("click", () => {
  state.photo.rotation = (state.photo.rotation + 90) % 360;
  drawPhotoStudio();
});
els.flipPhoto.addEventListener("click", () => {
  state.photo.flip = !state.photo.flip;
  drawPhotoStudio();
});
els.cropPhoto.addEventListener("click", cropPhoto);
els.downloadPhoto.addEventListener("click", downloadPhoto);
document.querySelectorAll(".photo-tool").forEach((button) => {
  button.addEventListener("click", () => setPhotoTool(button.dataset.photoTool));
});
els.photoCanvas.addEventListener("pointerdown", startPhotoPointer);
els.photoCanvas.addEventListener("pointermove", movePhotoPointer);
window.addEventListener("pointerup", endPhotoPointer);
els.prevSlide.addEventListener("click", () => {
  state.activeSlide = Math.max(0, state.activeSlide - 1);
  renderSlides();
});
els.nextSlide.addEventListener("click", () => {
  state.activeSlide = Math.min(state.slides.length - 1, state.activeSlide + 1);
  renderSlides();
});
els.markIn.addEventListener("click", () => {
  state.markIn = els.playback.currentTime || state.playhead || 0;
});
els.markOut.addEventListener("click", () => {
  state.markOut = els.playback.currentTime || state.playhead || Math.max(0, state.markIn + 2);
});
els.addCut.addEventListener("click", () => {
  const start = Math.min(state.markIn, state.markOut);
  const end = Math.max(state.markIn, state.markOut);
  if (end > start) {
    pushHistory();
    state.cuts.push({ in: start, out: end });
    renderCuts();
    commitChange();
  }
});
els.clearCuts.addEventListener("click", () => {
  pushHistory();
  state.cuts = [];
  renderCuts();
  commitChange();
});
els.splitClip.addEventListener("click", splitSelectedClip);
els.playTimeline.addEventListener("click", playTimeline);
els.splitCaptions.addEventListener("click", renderCaptionBlocks);
els.applyCaption.addEventListener("click", () => {
  pushHistory();
  state.caption = els.captionText.value;
  addMediaClip({ type: "captions", name: "Caption overlay", text: state.caption, duration: DEFAULT_DURATION });
  checks.captions.classList.add("done");
  commitChange();
});
els.addTimedCaption.addEventListener("click", addTimedCaption);
els.aiCaptionButton.addEventListener("click", autoTimeCaptions);
els.addTextOverlay.addEventListener("click", () => addTextClip("text"));
els.addLowerThird.addEventListener("click", () => addTextClip("lower"));
els.addLogo.addEventListener("click", () => addTextClip("logo"));
els.normalizeAudio.addEventListener("click", () => {
  const clip = selectedClip();
  if (clip) {
    pushHistory();
    clip.volume = 1;
    clip.noiseReduction = true;
    renderInspector();
    renderWaveform();
    commitChange();
  }
});
els.addKeyframe.addEventListener("click", addKeyframe);
els.addClickEffect.addEventListener("click", addClickEffect);
els.waveformCanvas.addEventListener("click", setWaveformSelection);
els.silenceWaveform.addEventListener("click", () => applyWaveformEdit("silence"));
els.boostWaveform.addEventListener("click", () => applyWaveformEdit("boost"));
els.fadeWaveform.addEventListener("click", () => applyWaveformEdit("fade"));
[els.clipStart, els.clipTrimIn, els.clipTrimOut, els.clipVolume, els.clipMute, els.clipFadeIn, els.clipFadeOut, els.clipNoise, els.clipCrop, els.textSize, els.textColor, els.fillColor, els.textAlign, els.textBold].forEach((input) => {
  input.addEventListener("input", updateClipFromInspector);
});
els.editCanvas.addEventListener("pointerdown", startCanvasDrag);
els.downloadButton.addEventListener("click", exportTimeline);
els.cancelExport.addEventListener("click", () => {
  state.exportCancel = true;
});
els.createShareLink.addEventListener("click", createSharePackage);
els.copyShareLink.addEventListener("click", copyShareLink);
els.createAccount.addEventListener("click", createAccount);
els.loginAccount.addEventListener("click", loginAccount);
els.resetPassword.addEventListener("click", resetPassword);
els.syncProject.addEventListener("click", syncProjectNow);
els.addTeamMember.addEventListener("click", addTeamMember);
els.addComment.addEventListener("click", addComment);
els.loadAudit.addEventListener("click", loadAudit);
els.loadRevisions.addEventListener("click", loadRevisions);
els.runQaCheck.addEventListener("click", runQaCheck);
els.stressTimeline.addEventListener("click", stressTimeline);
els.searchMarketplace.addEventListener("click", loadMarketplace);
els.uploadMarketplaceAsset.addEventListener("click", uploadMarketplaceAsset);
[els.enableChromaKey, els.chromaColor, els.enableMask, els.enableStabilize, els.speedRamp].forEach((input) => {
  input.addEventListener("input", updateFinishing);
});
[els.colorExposure, els.colorContrast, els.colorSaturation, els.colorTemperature].forEach((input) => {
  input.addEventListener("input", updateColorGrade);
});
[els.masterCompressor, els.masterLufs, els.eqLow, els.eqHigh].forEach((input) => {
  input.addEventListener("input", updateMasterAudio);
});
els.lutInput.addEventListener("change", (event) => importLut(event.target.files[0]));
els.addColorNode.addEventListener("click", addColorNode);
els.addQualifier.addEventListener("click", toggleQualifier);
els.enableHdr.addEventListener("click", toggleHdr);
els.analyzeLoudness.addEventListener("click", analyzeLoudness);
els.noiseRepair.addEventListener("click", noiseRepair);
els.addAudioBus.addEventListener("click", addAudioBus);
els.addRenderJob.addEventListener("click", addRenderQueueJob);
els.clearRenderQueue.addEventListener("click", clearRenderQueue);
els.packageApp.addEventListener("click", packageApp);
els.installApp.addEventListener("click", installApp);
els.openOffline.addEventListener("click", registerServiceWorker);
els.languageSelect.addEventListener("change", () => applyLanguage(els.languageSelect.value));
els.renewSubscription.addEventListener("click", renewFreeSubscription);
els.remindSubscription.addEventListener("click", remindSubscriptionLater);
els.enableSubscriptionNotifications.addEventListener("click", enableSubscriptionNotifications);
els.testSubscriptionNotification.addEventListener("click", testSubscriptionNotification);

populateLanguages();
renderSlides();
renderTimeline();
renderInspector();
renderCaptionBlocks();
renderPhotoPresets();
drawPhotoStudio();
renderLibraries();
loadMarketplace();
renderProSuite();
detectEngines();
renderInstallReadiness();
registerServiceWorker();
runQaCheck();
renderCollabActivity();
restoreAutosave();
syncHistoryButtons();
applyLanguage(els.languageSelect.value);
scheduleSubscriptionChecks();
drawFrame();
