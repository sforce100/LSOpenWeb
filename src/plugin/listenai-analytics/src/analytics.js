/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require("axios");
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
async function upload(location, origin) {
  const { pathname } = location;
  console.log("upload1", pathname, origin);

  let title = ''

  try {
    title += `${document.getElementsByClassName('navbar__link--active')[0].textContent}`
    title += `-${document.getElementsByClassName('subnavbar__link--active')[0].textContent}`
    for (let i =0; i < document.getElementsByClassName('menu__link--active').length; i++) {
      title += `-${document.getElementsByClassName('menu__link--active')[i].textContent}`
    }
  } catch (error) {}

  try {
    const response = await axios({
      method: "post",
      url: `${origin}/event_upload`,
      data: {
        event_type: "lsopen_pageview",
        title,
        url: window.location.origin + pathname,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  upload(location, window.location.origin.indexOf('staging') >= 0 ? 'https://staging-open.listenai.com' : 'https://open.listenai.com');

  return {

    onRouteUpdate({ location }) {
      // window.location.origin
      upload(location, window.location.origin.indexOf('staging') >= 0 ? 'https://staging-open.listenai.com' : 'https://open.listenai.com');
    },
  };
})();
