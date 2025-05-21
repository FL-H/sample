// math.js
// 数学関連の関数を定義し、エクスポートする

/**
 * 2つの数値を足し算します。
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {number} 合計
 */
export function add(a, b) {
    return a + b;
}

/**
 * 2つの数値を引き算します。
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {number} 差
 */
export function subtract(a, b) {
    return a - b;
}

// デフォルトエクスポートの例（モジュール全体で1つだけ）
const PI = 3.14159;
export default PI;

// 定数もエクスポートできる
export const GREETING = "Hello from Math Module!";