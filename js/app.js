// app.js
// math.js から機能を取り込んで利用する

// 名前付きエクスポートのインポート
// 必要なものだけ{}で囲んで指定します
import { add, subtract, GREETING } from './math.js';

// デフォルトエクスポートのインポート
// 任意の名前で受け取れます（ここでは MathPI とした）
import MathPI from './math.js';

document.addEventListener('DOMContentLoaded', function () {
    const resultAdd = add(10, 5);
    const resultSubtract = subtract(10, 5);

    const outputDiv = document.getElementById('output');

    if (outputDiv) {
        outputDiv.innerHTML += `<p>${GREETING}</p>`;
        outputDiv.innerHTML += `<p>10 + 5 = ${resultAdd}</p>`;
        outputDiv.innerHTML += `<p>10 - 5 = ${resultSubtract}</p>`;
        outputDiv.innerHTML += `<p>PI (from default export): ${MathPI}</p>`;
    } else {
        console.error("ID 'output' の要素が見つかりません。");
    }

    // 特定のボタンがクリックされたらさらに何かをする例（前の質問の延長）
    const dynamicAddButton = document.getElementById('dynamicAddButton');
    if (dynamicAddButton) {
        dynamicAddButton.addEventListener('click', function () {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `<h3>動的に追加された要素</h3><p>計算結果: ${add(20, 25)}</p>`;
            if (outputDiv) {
                outputDiv.appendChild(newDiv);
            }
        });
    }
});