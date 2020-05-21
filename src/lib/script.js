export default function (obj) {
  return Function(`"use strict";return (${obj})`)();
}
