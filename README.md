# Flight Simulator

Three.js で作るブラウザ用フライトシミュレーター。

## 動かし方

ES モジュールを使っているため、`index.html` をダブルクリックで開くだけでは動きません。
ローカルサーバー経由で開いてください。

```bash
npx serve .
```

（または VS Code の Live Server 拡張、`python -m http.server` など）

## 操作

| キー | 動作 |
| --- | --- |
| I / K | ピッチ（機首上げ / 機首下げ） |
| J / L | ロール（左 / 右） |
| U / O | ヨー（左 / 右） |

キー割り当ては `src/config.js` の `KEY_BINDINGS` で変更できます。

## フォルダ構成

```
index.html            エントリーポイント（importmap で three を読み込み）
styles/               CSS
src/
  main.js             シーン生成とゲームループ
  config.js           速度・カメラ・キー割り当てなどの調整値
  aircraft/           航空機（モデルと飛行挙動）
  world/              地面・滑走路などの地形
  camera/             追従カメラ
  input/              キーボード入力
assets/
  models/             3D モデル (glTF など)
  textures/           テクスチャ画像
  sounds/             効果音・BGM
archive/jsfiddle/     jsfiddle から書き出した元のコード（参考用）
```

### 拡張するときの目安

- 新しい機体 → `src/aircraft/` にクラスを追加
- 物理演算（揚力・重力・速度変化） → `src/physics/` を作って `Aircraft.update` から呼ぶ
- 計器表示（速度・高度） → `src/ui/` に HUD を追加
- ゲームパッド対応 → `src/input/` に追加し、`getControls()` と同じ形を返す
