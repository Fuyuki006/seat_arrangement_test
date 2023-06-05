# seat_arrangement_test
[作成した座席予約アプリ](https://github.com/Fuyuki006/Seat-Reservation) を利用する環境の席の配置状況を再現する目的で作成した。
html・css・javascriptによって実現しようした制作物。
サーバーレスでのアプリケーションの開発をしたいと考えたため、Google Apps Script を採用し、この案は却下された。
実現は叶わなかったものの、今後はユーザーが「席の配置状況を再現」するためのツール・アプリとしてこちらを改めて実装予定。

## login.html 
ユーザー毎に利用する環境の席の配置を行えるように作成したログインページ。

### images
<div>
  <p align="center">
    <img width="80%"src="https://github.com/Fuyuki006/seat_arrangement_test/assets/125243602/42d1286a-706d-4d18-a3ad-caa271de398b">
  </p>
</div>

## arrangement_canvas.html
実際に、席の配置を行うページ。

### 機能
- 席(の画像) をドラッグ&ドロップで移動
- 「追加」ボタンで席を追加

### gifs
