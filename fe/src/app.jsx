/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BaseFrontend } from "./components/core_components.jsx";

const MainApp = () => {
  return <BaseFrontend />;
};

const root = ReactDOM.createRoot(document.getElementById("mpt-gpt-chatbox"));
root.render(
    <MainApp />
);
