const { existsSync, readFileSync } = require("fs");
const { join } = require("path");
function getSidebar(path) {
  if (existsSync(join("docs", path, "sidebar.json"))) {
    const sidebar = require(join(__dirname, "docs", path, "sidebar.json"));
    // if is array, return it
    if (Array.isArray(sidebar)) {
      return sidebar;
    } else {
      return [sidebar];
    }
  } else {
    return {
      type: "autogenerated",
      dirName: path, //二级目录
    };
  }
}
module.exports = {
  // autogeneratedSidebar: [
  //   {
  //     type: 'autogenerated',
  //     dirName: 'API/lisa_core',
  //   }
  // ],
  startintroduction: [
    {
      type: "autogenerated",
      dirName: "start/introduction", //二级目录
    },
  ],
  startQuickStart: [
    {
      type: "autogenerated",
      dirName: "start/QuickStart", //二级目录
    },
  ],
  /* ---- chips ----- */
  chipsSelection_guide: [
    //定义名称
    {
      type: "autogenerated",
      dirName: "chips/Selection_guide", //二级目录
    },
  ],
  chips600X: [
    {
      type: "autogenerated",
      dirName: "chips/600X", //二级目录
    },
  ],
  micropython: [...getSidebar("chips/micropython")],
  //chips4002NC: [
  //  {
  //    type: 'autogenerated',
  //    dirName: 'chips/4002NC',//二级目录
  //  }
  // ],
  //  chips300X: [
  //    {
  //      type: 'autogenerated',
  //      dirName: 'chips/300X',//二级目录
  //    }
  //  ],
  SDKintroduction: [
    {
      type: "autogenerated",
      dirName: "SDK/SDK", //二级目录
    },
  ],
  toolsLStudio: [
    {
      type: "autogenerated",
      dirName: "tools/LStudio", //二级目录
    },
  ],
  toolsLISA: [
    {
      type: "autogenerated",
      dirName: "tools/LISA_LPM", //二级目录
    },
  ],
  toolstools: [
    {
      type: "autogenerated",
      dirName: "tools/tools", //二级目录
    },
  ],
  mass_production: [
    {
      type: "autogenerated",
      dirName: "tools/mass_production", //二级目录
    },
  ],
  AIsolutionESR: [
    {
      type: "autogenerated",
      dirName: "AIsolution/ESR", //二级目录
    },
  ],
  AIsolutionNC: [
    {
      type: "autogenerated",
      dirName: "AIsolution/NC", //二级目录
    },
  ],
  AIsolutionDSP: [
    {
      type: "autogenerated",
      dirName: "AIsolution/dsp", //二级目录
    },
  ],
  IndustrysolutionCON: [
    {
      type: "autogenerated",
      dirName: "Industrysolution/Smartairconditioning", //二级目录
    },
  ],
  IndustrysolutionCON: [
    {
      type: "autogenerated",
      dirName: "Industrysolution/Conference_calling_solutions", //二级目录
    },
  ],
  FAQ: [
    {
      type: "autogenerated",
      dirName: "FAQ/FAQ", //二级目录
    },
  ],
  Scanning_pen: [
    {
      type: "autogenerated",
      dirName: "Industrysolution/Scanning_pen", //二级目录
    },
  ],
  CloudView_solution: [
    {
      type: "autogenerated",
      dirName: "Industrysolution/CloudView_solution", //二级目录
    },
  ],
};
