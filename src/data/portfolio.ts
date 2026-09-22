export type Language = 'zh' | 'en'

export type Localized = {
  zh: string
  en: string
}

export type ProjectCategory = 'simulation' | 'parallel' | 'rendering'

export type ProjectStat = {
  label: Localized
  value: string
}

export type Project = {
  id: string
  number: string
  title: string
  category: ProjectCategory
  categoryLabel: Localized
  summary: Localized
  description: Localized
  image: string
  imageAlt: Localized
  tags: string[]
  year: string
  highlights: Localized[]
  stats: ProjectStat[]
  repositoryUrl: string
}

export type Education = {
  institution: Localized
  degree: Localized
  period: Localized
}

export const profile = {
  name: { zh: '夏果', en: 'Xia Guo' },
  shortName: 'XG',
  role: {
    zh: '计算机图形学 · GPU 编程',
    en: 'Computer Graphics · GPU Programming',
  },
  introduction: {
    zh: '重庆大学计算机学院本科四年级学生，研究兴趣包括计算机图形学、GPU 编程与 CUDA 并行计算。',
    en: 'Senior undergraduate at Chongqing University, focused on computer graphics, GPU programming, and CUDA parallel computing.',
  },
  location: { zh: '重庆，中国', en: 'Chongqing, China' },
  email: '',
  githubUrl: 'https://github.com/Summerfruity',
  resumeUrl: '',
  researchInterests: [
    { zh: '计算机图形学', en: 'COMPUTER GRAPHICS' },
    { zh: 'GPU 编程', en: 'GPU PROGRAMMING' },
    { zh: 'CUDA', en: 'CUDA' },
    { zh: '并行计算', en: 'PARALLEL COMPUTING' },
  ] satisfies Localized[],
  technologies: ['C++', 'CUDA', 'OpenGL', 'CMake', 'Thrust', 'glTF'],
}

export const education: Education[] = [
  {
    institution: { zh: '重庆大学', en: 'Chongqing University' },
    degree: {
      zh: '计算机学院 · 本科四年级',
      en: 'College of Computer Science · Senior Undergraduate',
    },
    period: { zh: '在读', en: 'Current' },
  },
]

export const projects: Project[] = [
  {
    id: 'cuda-flocking',
    number: '01',
    title: 'CUDA Flocking',
    category: 'simulation',
    categoryLabel: { zh: '实时仿真', en: 'REAL-TIME SIMULATION' },
    summary: {
      zh: '在 GPU 上实时更新 3D Boids，并比较三种邻居搜索与数据布局方案。',
      en: 'A real-time 3D boids simulation comparing three neighbor-search and data-layout strategies on the GPU.',
    },
    description: {
      zh: '基于 Reynolds 群集规则实现聚合、分离和对齐，通过 CUDA/OpenGL 互操作直接更新可视化缓冲。项目实现了全对搜索、散列均匀网格和内存连续网格三条更新路径，并用 CUDA Event 记录性能。',
      en: 'Implements Reynolds cohesion, separation, and alignment rules with CUDA/OpenGL interoperability. The project compares an all-pairs baseline, a scattered uniform grid, and a coherent grid measured with CUDA events.',
    },
    image: '/projects/cuda-flocking.gif',
    imageAlt: {
      zh: 'CUDA Flocking 运行画面，大量彩色 Boids 在黑色背景中形成群集',
      en: 'CUDA Flocking runtime showing thousands of colored boids against a black background',
    },
    tags: ['CUDA', 'C++', 'OpenGL', 'Thrust'],
    year: '2025',
    stats: [
      { label: { zh: '实时实例', en: 'LIVE BOIDS' }, value: '10K' },
      { label: { zh: '测试规模', en: 'BENCHMARK' }, value: '50K' },
      { label: { zh: '加速比', en: 'SPEEDUP' }, value: '33×' },
    ],
    highlights: [
      {
        zh: '实现三套 CUDA 更新路径，清楚分离算法复杂度与内存局部性的影响。',
        en: 'Built three CUDA update paths to isolate algorithmic complexity and memory-locality effects.',
      },
      {
        zh: '用均匀网格将邻居搜索从全对遍历缩小到相邻网格，并通过数据重排去除间接访存。',
        en: 'Reduced neighbor search to adjacent grid cells and removed an indirection through coherent data reordering.',
      },
      {
        zh: '在 RTX 3060 Laptop GPU 的 50K Boids 测试中，连续网格为 0.629 ms/step，全对基线为 20.834 ms/step。',
        en: 'At 50K boids on an RTX 3060 Laptop GPU, the coherent grid measured 0.629 ms/step versus 20.834 ms/step for all-pairs.',
      },
    ],
    repositoryUrl: 'https://github.com/Summerfruity/CUDA-Flocking',
  },
  {
    id: 'stream-compaction',
    number: '02',
    title: 'Stream Compaction',
    category: 'parallel',
    categoryLabel: { zh: '并行算法', en: 'PARALLEL ALGORITHMS' },
    summary: {
      zh: '从 CPU 到 CUDA 实现前缀和与流压缩，并比较 Naive、Blelloch 与 Thrust。',
      en: 'CPU and CUDA implementations of prefix scan and stream compaction, comparing naive, Blelloch, and Thrust approaches.',
    },
    description: {
      zh: '以 exclusive scan 为核心，实现串行参考、全局内存 ping-pong 扫描、Blelloch work-efficient 扫描和 Thrust 基线；流压缩使用 map-scan-scatter 删除零元素并保持顺序。实现支持任意长度输入，并包含正确性测试与计时。',
      en: 'Implements a serial reference, global-memory ping-pong scan, Blelloch work-efficient scan, and a Thrust baseline. Stream compaction uses map-scan-scatter to remove zeroes while preserving order, with arbitrary-length input support and correctness checks.',
    },
    image: '/projects/stream-compaction.svg',
    imageAlt: {
      zh: '流压缩算法示意，将包含零的输入数组压缩为非零元素数组',
      en: 'Stream compaction diagram reducing an input array with zeroes to its non-zero elements',
    },
    tags: ['CUDA', 'C++', 'Blelloch Scan', 'Thrust'],
    year: '2025',
    stats: [
      { label: { zh: '输入规模', en: 'INPUT SIZE' }, value: '1M' },
      { label: { zh: '扫描实现', en: 'SCAN PATHS' }, value: '04' },
      { label: { zh: 'GPU 压缩', en: 'GPU COMPACT' }, value: '0.72ms' },
    ],
    highlights: [
      {
        zh: '实现 Blelloch up-sweep / down-sweep exclusive scan，并用补零处理非 2 的幂输入。',
        en: 'Implemented Blelloch up-sweep/down-sweep exclusive scan with padding for non-power-of-two inputs.',
      },
      {
        zh: '通过 map-scan-scatter 在 GPU 上完成稳定流压缩，并与 CPU 结果逐项校验。',
        en: 'Built stable GPU stream compaction with map-scan-scatter and element-wise validation against the CPU result.',
      },
      {
        zh: '对一百万级输入比较 CPU、Naive CUDA、work-efficient CUDA 与 Thrust 的运行时间。',
        en: 'Compared CPU, naive CUDA, work-efficient CUDA, and Thrust timings on million-element inputs.',
      },
    ],
    repositoryUrl: 'https://github.com/Summerfruity/Stream-Compaction',
  },
  {
    id: 'cuda-path-tracer',
    number: '03',
    title: 'CUDA Path Tracer',
    category: 'rendering',
    categoryLabel: { zh: '离线渲染', en: 'OFFLINE RENDERING' },
    summary: {
      zh: '支持 glTF 场景、材质、纹理和两级 BVH 的渐进式 CUDA 路径追踪器。',
      en: 'A progressive CUDA path tracer with glTF scenes, materials, textures, and two-level BVH acceleration.',
    },
    description: {
      zh: '每个像素在 GPU 上追踪路径并累积全局光照结果。渲染器支持解析几何与 glTF 三角网格、漫反射/镜面/折射/自发光材质、景深、流压缩、材质排序，以及由 TLAS 与网格 BVH 组成的两级加速结构。',
      en: 'Traces and accumulates a path per pixel on the GPU. The renderer supports analytic geometry and glTF meshes, diffuse/specular/refractive/emissive materials, depth of field, stream compaction, material sorting, and TLAS plus per-mesh BVHs.',
    },
    image: '/projects/cuda-path-tracer.jpg',
    imageAlt: {
      zh: 'CUDA Path Tracer 渲染的 Damaged Helmet glTF 模型',
      en: 'Damaged Helmet glTF model rendered by the CUDA Path Tracer',
    },
    tags: ['CUDA', 'C++', 'Path Tracing', 'glTF', 'BVH'],
    year: '2026',
    stats: [
      { label: { zh: '输出尺寸', en: 'OUTPUT' }, value: '800²' },
      { label: { zh: '样本数', en: 'SAMPLES' }, value: '8008' },
      { label: { zh: '加速结构', en: 'ACCELERATION' }, value: '2-LVL BVH' },
    ],
    highlights: [
      {
        zh: '实现 CUDA 路径生成、相交测试、材质散射、路径终止与渐进式图像累积。',
        en: 'Implemented CUDA ray generation, intersection, material scattering, path termination, and progressive accumulation.',
      },
      {
        zh: '加载 glTF 节点变换、索引网格、材质与纹理，并构建网格 BVH 和顶层 BVH。',
        en: 'Loaded glTF node transforms, indexed meshes, materials, and textures, then built mesh and top-level BVHs.',
      },
      {
        zh: '集成自适应流压缩、材质排序、Russian roulette 与可切换的运行时分析面板。',
        en: 'Integrated adaptive stream compaction, material sorting, Russian roulette, and runtime analysis controls.',
      },
    ],
    repositoryUrl: 'https://github.com/Summerfruity/CUDA-Path-Tracer',
  },
]
