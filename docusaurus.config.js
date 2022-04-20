const isProd = process.env.NODE_ENV === 'production';
const debug = !isProd

module.exports = {
  title: '聆思文档中心',
  tagline: '聆思文档中心',
  url: 'https://github.com/LISTENAI',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'listenai', // Usually your GitHub org/user name.
  projectName: 'LSOpenWeb', // Usually your repo name.
  organizationName: 'LISTENAI',
  themeConfig: {
    navbar: {
      title: '聆思文档中心',
      logo: {
        href: '/',
        alt: 'LSOpen Logo',
        src: 'img/logo_light.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
//        {
//          activeBasePath: "/start",
//          to: "/start/introduction",
//          label: '开始',
//          position: 'left'
//        },
        {
          activeBasePath: "/chips",
          to: "/chips/4002/Chip_information_4002", //跳转哪个目录
          label: '芯片', 
          position: 'left'
        },
        {
//          to: "/SDK/SDK/introduction",
//          label: 'SDK',
//          position: 'left'
//        },
//        {
          activeBasePath: "/tools",
          to: '/tools/LStudio',
          label: '工具',
          position: 'left'
        },
        {
          activeBasePath: "/AIsolution",
          to: '/AIsolution/ESR/Quick_start/Scheme_introduction',
          label: 'AI语音应用方案',
          position: 'left'
        },
        {
          to: '/Industrysolution/Scanning_pen/Scheme_introduction',
          label: '行业Turnkey解决方案',
          position: 'left'
        },
        {
          to: '/faq/faq',
          label: 'FAQ',
          position: 'right'
        },
        {
          to: '/school/school',
          label: '视频课程',
          position: 'right'
        },
        {
          href: "/workorder/workorder",
          label: "工单",
          position: 'right'
        }
      ],
    },
    subNavbar: [
      {
        dirName: '/start',
       items: [
        ],
      },
      {
        dirName: '/chips',//对应的一级目录
        items: [
//          {
//            to: "/chips/selection_guide",//跳转哪个目录
//            label: '芯片选型指南',
//          },
          {
            activeBasePath: "/chips/4002/",
            to: "/chips/4002/Chip_information_4002",
            label: 'CSK4002',
          },
          {
            activeBasePath: "/chips/600X/",
            to: "/chips/600X/index",
            label: 'CSK600X',
          },
          {
            activeBasePath: "/chips/micropython/",
            to: "/chips/micropython/index",
            label: 'MicroPython',
          },
//          {
//            activeBasePath: "/chips/4002NC/",
//            to: "/chips/4002NC/Chip_information_4002NC",
//            label: '4002NC',
//          },
//          {
//            activeBasePath: "/chips/300X/",
//            to: "/chips/300X/Chip_information_300X",
//            label: '300X',
//          },
        ],
      },
      {
        dirName: '/SDK',//对应的一级目录
        items: [
          {
            to: "/SDK/SDK/introduction",//跳转哪个目录
            label: 'SDK开发',
          },
        ],
      },
      {
        dirName: '/tools',//对应的一级目录
        items: [
          {
            activeBasePath: "/tools/LStudio",
            to: "/tools/LStudio",
            label: 'LStudio',
          },
          {
            activeBasePath: "/tools/LISA_LPM",
            to: "/tools/LISA_LPM/awesome",//跳转哪个目录
            label: 'LISA&LPM',
          },
          {
            activeBasePath: "/tools/mass_production",
            to: "/tools/mass_production/readme",//跳转哪个目录
            label: '量产工具',
          }
        ],
      },
      {
        dirName: '/AIsolution',//对应的一级目录
        items: [
          {
            activeBasePath: "/AIsolution/ESR",
            to: "/AIsolution/ESR/Quick_start/Scheme_introduction",//跳转哪个目录
            label: '离线语音',
          },
//          {
//            activeBasePath: "/AIsolution/NC",
//            to: "/AIsolution/NC/quicklystart/quicklystart",//跳转哪个目录
//            label: '通话降噪',
//          },
          {
            activeBasePath: "/AIsolution/dsp",
            to: "/AIsolution/dsp/readme",//跳转哪个目录
            label: '离在线语音',
          },
        ],
      },
      {
        dirName: '/Industrysolution',//对应的一级目录
        items: [
          {
            to: "/Industrysolution/Scanning_pen/Scheme_introduction",//跳转哪个目录
            label: '扫描笔',
          },
          {
            to: "/Industrysolution/Conference_calling_solutions/Quick_start/Scheme_introduction",//跳转哪个目录
            label: '会议机',
          },
          {
            to: "/Industrysolution/CloudView_solution/Quick_start/Scheme_introduction",//跳转哪个目录
            label: '云台',
          },
        ],
      },
      {
        dirName: '/faq',//对应的一级目录
        items: [
          {
            to: "/faq/faq",//跳转哪个目录
            label: '常见问题',
          },
        ],
      },
      {
        dirName: '/school',//对应的一级目录
        items: [
          {
            to: "/school/school",//跳转哪个目录
            label: '视频课程',
          },
        ],
      },
      {
        dirName: '/workorder',//对应的一级目录
        items: [
          {
            to: "/workorder/workorder",//跳转哪个目录
            label: '提交工单',
          },
        ],
      }
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      switchConfig: {
        darkIcon: {
          light: 'img/undark.svg',
          dark: 'img/dark.svg' 
        },
        lightIcon: {
          light: 'img/light.svg',
          dark: 'img/unlight.svg',
        },
      }
    },
    footer: {
      // style: 'dark',
      links: [],
      copyright: `Copyright © 安徽聆思智能科技有限公司皖ICP备05001217号`,
    },
    zoomSelector: '.markdown :not(em) > img',
  },
  presets: [
    [
      // '@docusaurus/preset-classic',
      require.resolve("./src/preset/index.js"),
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/customMd.css'),
          ],
        },
      },
    ],
  ],
  // themes: [
  //   [require.resolve('@docusaurus/theme-classic'), {
  //     customCss: require.resolve('./src/css/custom.css'),
  //   }],
  // ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexPages: true,
        docsRouteBasePath: ["/AIsolution/ESR/FAQ/faq","/AIsolution/ESR/Hardwaredevelopment/hardware_guide","/AIsolution/ESR/Optimization_and_testing/abnormalcheck","/AIsolution/ESR/Optimization_and_testing/auto_optimize","/AIsolution/ESR/Optimization_and_testing/optimize_skills","/AIsolution/ESR/Optimization_and_testing/test","/AIsolution/ESR/Optimization_and_testing/test_material","/AIsolution/ESR/Quick_start/Quick_start","/AIsolution/ESR/Quick_start/Scheme_introduction","/AIsolution/ESR/Quick_start/download_firmware","/AIsolution/ESR/algorithm/algorithm","/AIsolution/ESR/design/vui","/AIsolution/ESR/design/vui2","/AIsolution/ESR/softwaredevelopment/Advanced_development/csk_driver_demo","/AIsolution/ESR/softwaredevelopment/Advanced_development/csk_sdk_demo","/AIsolution/ESR/softwaredevelopment/Advanced_development/factory_config","/AIsolution/ESR/softwaredevelopment/Basic_development/audio_transmission","/AIsolution/ESR/softwaredevelopment/Basic_development/config_application","/AIsolution/ESR/softwaredevelopment/Basic_development/config_hardware","/AIsolution/ESR/softwaredevelopment/Basic_development/peripheral_config","/AIsolution/ESR/softwaredevelopment/Basic_development/public_uart_protocol","/AIsolution/ESR/softwaredevelopment/software_material","/AIsolution/dsp/FAQ/faq","/AIsolution/dsp/Hardwaredevelopment/hardware_guide","/AIsolution/dsp/Quick_start/developer_guides","/AIsolution/dsp/Quick_start/getting_start","/AIsolution/dsp/cloud_development/Custom_skills","/AIsolution/dsp/cloud_development/iot","/AIsolution/dsp/firmware_development/CSK_online_firmware","/AIsolution/dsp/firmware_development/Create_iFLYOS_equipment","/AIsolution/dsp/firmware_development/OTA_service","/AIsolution/dsp/firmware_development/software_material","/AIsolution/dsp/firmware_development/xr872_evs","/AIsolution/dsp/readme","/FAQ/faq","/Industrysolution/CloudView_solution/FAQ/faq","/Industrysolution/CloudView_solution/Hardwaredevelopment/hardware_guide","/Industrysolution/CloudView_solution/Quick_start/Scheme_introduction","/Industrysolution/CloudView_solution/softwaredevelopment/create_project","/Industrysolution/Conference_calling_solutions/FAQ/faq","/Industrysolution/Conference_calling_solutions/Hardwaredevelopment/hardware_guide","/Industrysolution/Conference_calling_solutions/Optimization/auto_optimize","/Industrysolution/Conference_calling_solutions/Quick_start/Scheme_introduction","/Industrysolution/Conference_calling_solutions/mass_production/test_material","/Industrysolution/Conference_calling_solutions/softwaredevelopment/create_project","/Industrysolution/Scanning_pen/Scanning_pen_turnkey","/Industrysolution/Scanning_pen/Scheme_introduction","/Industrysolution/Scanning_pen/api","/Industrysolution/Scanning_pen/evs","/Industrysolution/Scanning_pen/uart_spi_protocol","/chips/4002/Chip_information_4002","/chips/600X/API文档/index","/chips/600X/FAQ/index","/chips/600X/MicroPython 应用开发/advance/display","/chips/600X/MicroPython 应用开发/advance/mixed_program","/chips/600X/MicroPython 应用开发/bundle_program","/chips/600X/MicroPython 应用开发/faq/file_system","/chips/600X/MicroPython 应用开发/faq/memory","/chips/600X/MicroPython 应用开发/index","/chips/600X/MicroPython 应用开发/install","/chips/600X/MicroPython 应用开发/run","/chips/600X/MicroPython 应用开发/start","/chips/600X/index","/chips/600X/工具/Lisa Plugin MicroPython/commands","/chips/600X/工具/Lisa Plugin MicroPython/faq","/chips/600X/工具/Lisa Plugin MicroPython/index","/chips/600X/工具/Lisa Plugin MicroPython/install","/chips/600X/工具/Lisa Plugin MicroPython/versions","/chips/600X/工具/Lisa Plugin Zephyr/app_build_flash","/chips/600X/工具/Lisa Plugin Zephyr/create_command","/chips/600X/工具/Lisa Plugin Zephyr/debug_command","/chips/600X/工具/Lisa Plugin Zephyr/env_command","/chips/600X/工具/Lisa Plugin Zephyr/filesystem","/chips/600X/工具/Lisa Plugin Zephyr/index","/chips/600X/工具/Lisa Plugin Zephyr/install","/chips/600X/工具/Lisa Plugin Zephyr/release_note","/chips/600X/工具/Lisa Plugin Zephyr/sdk_command","/chips/600X/工具/Lisa Plugin Zephyr/trouble_shooting","/chips/600X/工具/index","/chips/600X/工具/其他/index","/chips/600X/工具/测试工具/index","/chips/600X/工具/量产工具/index","/chips/600X/应用开发/index","/chips/600X/应用开发/入门/index","/chips/600X/应用开发/入门/proj_build","/chips/600X/应用开发/入门/proj_config","/chips/600X/应用开发/入门/proj_create","/chips/600X/应用开发/入门/proj_debug_tracing","/chips/600X/应用开发/入门/proj_flash_run","/chips/600X/应用开发/基础/ZephyrCore/index","/chips/600X/应用开发/基础/audio_player","/chips/600X/应用开发/基础/audio_player_recorder","/chips/600X/应用开发/基础/audio_recorder","/chips/600X/应用开发/基础/bluetooth","/chips/600X/应用开发/基础/devicetree_driver","/chips/600X/应用开发/基础/display","/chips/600X/应用开发/基础/dsp","/chips/600X/应用开发/基础/file_system","/chips/600X/应用开发/基础/index","/chips/600X/应用开发/基础/logger","/chips/600X/应用开发/基础/mcuboot","/chips/600X/应用开发/基础/network","/chips/600X/应用开发/基础/shell","/chips/600X/应用开发/基础/usb","/chips/600X/应用开发/高级/add_board","/chips/600X/应用开发/高级/app_unit_test","/chips/600X/应用开发/高级/driver_dev","/chips/600X/应用开发/高级/index","/chips/600X/应用开发/高级/lisa_dev","/chips/600X/应用开发/高级/lisa_porting","/chips/600X/应用开发/高级/mp_support","/chips/600X/应用开发/高级/thirdparty_lib","/chips/600X/应用开发/高级/use_lvgl","/chips/600X/快速开始/index","/chips/600X/快速开始/start_env","/chips/600X/快速开始/start_project","/chips/600X/概述/index","/chips/600X/概述/工具/index","/chips/600X/概述/开发板/index","/chips/600X/概述/开发板/nanokit","/chips/600X/概述/开发板/pico","/chips/600X/概述/系统/index","/chips/600X/概述/芯片/index","/chips/600X/版本信息/csk6_sdk_1.0.0","/chips/600X/版本信息/csk6_sdk_current","/chips/600X/版本信息/index","/chips/600X/示例/index","/chips/600X/系统设计/ap_cp","/chips/600X/系统设计/index","/chips/600X/系统设计/sentry","/chips/600X/系统设计/wireless_soc","/chips/micropython/lisa_plugin_mpy/commands","/chips/micropython/lisa_plugin_mpy/faq","/chips/micropython/lisa_plugin_mpy/index","/chips/micropython/lisa_plugin_mpy/install","/chips/micropython/lisa_plugin_mpy/versions","/chips/micropython/micropython_app_dev/advance/display","/chips/micropython/micropython_app_dev/advance/mixed_program","/chips/micropython/micropython_app_dev/bundle_program","/chips/micropython/micropython_app_dev/faq/file_system","/chips/micropython/micropython_app_dev/faq/memory","/chips/micropython/micropython_app_dev/index","/chips/micropython/micropython_app_dev/install","/chips/micropython/micropython_app_dev/start","/school/school","/tools/LISA_LPM/awesome","/tools/LISA_LPM/development/API/README","/tools/LISA_LPM/development/API/classes/actionbase","/tools/LISA_LPM/development/API/classes/application","/tools/LISA_LPM/development/API/classes/config","/tools/LISA_LPM/development/API/classes/exiterror","/tools/LISA_LPM/development/API/classes/fs.bigintstats","/tools/LISA_LPM/development/API/classes/fs.dir","/tools/LISA_LPM/development/API/classes/fs.dirent","/tools/LISA_LPM/development/API/classes/fs.project","/tools/LISA_LPM/development/API/classes/fs.readstream","/tools/LISA_LPM/development/API/classes/fs.stats","/tools/LISA_LPM/development/API/classes/fs.writestream","/tools/LISA_LPM/development/API/classes/pipelineobject","/tools/LISA_LPM/development/API/enums/lisaenv","/tools/LISA_LPM/development/API/interfaces/fs.baseencodingoptions","/tools/LISA_LPM/development/API/interfaces/fs.bigintoptions","/tools/LISA_LPM/development/API/interfaces/fs.copyoptions","/tools/LISA_LPM/development/API/interfaces/fs.copyoptionssync","/tools/LISA_LPM/development/API/interfaces/fs.ensureoptions","/tools/LISA_LPM/development/API/interfaces/fs.fswatcher","/tools/LISA_LPM/development/API/interfaces/fs.makedirectoryoptions","/tools/LISA_LPM/development/API/interfaces/fs.moveoptions","/tools/LISA_LPM/development/API/interfaces/fs.opendiroptions","/tools/LISA_LPM/development/API/interfaces/fs.pathentry","/tools/LISA_LPM/development/API/interfaces/fs.pathentrystream","/tools/LISA_LPM/development/API/interfaces/fs.promises.filehandle","/tools/LISA_LPM/development/API/interfaces/fs.readoptions","/tools/LISA_LPM/development/API/interfaces/fs.readsyncoptions","/tools/LISA_LPM/development/API/interfaces/fs.readvresult","/tools/LISA_LPM/development/API/interfaces/fs.rmdiroptions","/tools/LISA_LPM/development/API/interfaces/fs.rmoptions","/tools/LISA_LPM/development/API/interfaces/fs.statoptions","/tools/LISA_LPM/development/API/interfaces/fs.statsbase","/tools/LISA_LPM/development/API/interfaces/fs.writefileoptions","/tools/LISA_LPM/development/API/interfaces/fs.writeoptions","/tools/LISA_LPM/development/API/interfaces/fs.writevresult-1","/tools/LISA_LPM/development/API/interfaces/fs.writevresult","/tools/LISA_LPM/development/API/interfaces/ipromptoptions","/tools/LISA_LPM/development/API/interfaces/table.table-1.column","/tools/LISA_LPM/development/API/interfaces/table.table-1.options","/tools/LISA_LPM/development/API/modules/fs.constants","/tools/LISA_LPM/development/API/modules/fs.exists","/tools/LISA_LPM/development/API/modules/fs.lchmod","/tools/LISA_LPM/development/API/modules/fs.lutimes","/tools/LISA_LPM/development/API/modules/fs","/tools/LISA_LPM/development/API/modules/fs.promises","/tools/LISA_LPM/development/API/modules/fs.readv","/tools/LISA_LPM/development/API/modules/fs.realpathsync","/tools/LISA_LPM/development/API/modules/fs.rm","/tools/LISA_LPM/development/API/modules/table","/tools/LISA_LPM/development/API/modules/table.table-1","/tools/LISA_LPM/development/API/modules","/tools/LISA_LPM/development/basic","/tools/LISA_LPM/development/config_file","/tools/LISA_LPM/development/examples/cmd","/tools/LISA_LPM/development/examples/download","/tools/LISA_LPM/development/task_file","/tools/LISA_LPM/development/tools_publish","/tools/LISA_LPM/installation","/tools/LISA_LPM/instance/lisa_create","/tools/LISA_LPM/instance/login","/tools/LISA_LPM/instance/old_build","/tools/LISA_LPM/instance/tools","/tools/LISA_LPM/node_installation","/tools/LISA_LPM/other/cloud_package","/tools/LISA_LPM/other/package_version","/tools/LISA_LPM/other/source","/tools/LISA_LPM/other/tutorial","/tools/LISA_LPM/update2","/tools/LStudio/guide/create","/tools/LStudio/guide/login","/tools/LStudio/guide/userinterface","/tools/LStudio/plugins/linipreviewer","/tools/LStudio/plugins/lisa","/tools/LStudio/previewer/application","/tools/LStudio/previewer/hardware","/tools/LStudio/previewer/interact","/tools/LStudio","/tools/mass_production/WebTools/pack","/tools/mass_production/WebTools/print","/tools/mass_production/WebTools/verify","/tools/mass_production/cskburner","/tools/mass_production/readme","/workorder/workorder"],
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
        translations: {
          search_placeholder: "搜索",
          see_all_results: "查看所有结果",
          no_results: "无查询结果",
          search_results_for: "搜索关键字 \"{{ keyword }}\" 的结果",
          count_documents_found_plural: "共 {{ count }} 个查询结果",
          no_documents_were_found: "无查询结果"
        }
      },
    ],
    // [
    //   require.resolve('@docusaurus/plugin-content-docs'),
    //   {
    //     sidebarPath: require.resolve('./sidebars.js'),
    //     routeBasePath: '/'
    //     // Please change this to your repo.
    //     // editUrl:
    //     //   'https://github.com/facebook/docusaurus/edit/master/website/',
    //   },
    // ],
    // [
    //   require.resolve('@docusaurus/plugin-content-pages'),
    //   {},
    // ],
    // debug && require.resolve('@docusaurus/plugin-debug'),
    // isProd && [
    //   require.resolve('@docusaurus/plugin-sitemap'),
    //   {},
    // ],
    // // ... Your other plugins.
    'listenai-analytics',
    'listenai-kf',
    'plugin-image-zoom',
  ],
};
