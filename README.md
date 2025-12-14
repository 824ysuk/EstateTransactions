<!-- File: README.md -->

# estate-transactions-api

不動産取引価格を検索して返すAPI（NestJS）

## ゴール

GET /api/v1/townPlanning/estateTransaction/bar に対して、クエリ（year, prefectureCode, type）を受け取り、assets/estate_transactions.json を参照して該当の取引価格（円/㎡）を返す

実装は Controller > UseCase > Repository(抽象) > Infrastructure を前提に責務分離する  
クエリはバリデーションし、異常系はHTTPステータスで機械的に判定できる状態にする  
Postmanで同一リクエストを再現できる状態にする

## 前提

Node.js 20.11.0 以上（.nvmrc 参照）

## セットアップ

依存関係をインストールする

    npm install

## 起動

開発モードで起動する（ホットリロード）

    npm run start:dev

本番相当で起動する（build済みを実行）

    npm run build
    npm run start:prod

## 動作確認

ワンコマンドで実行する（format / lint / typecheck / unit / e2e）

    npm run verify

## API

エンドポイント

    GET http://localhost:3000/api/v1/townPlanning/estateTransaction/bar

クエリ

year: number（必須）  
prefectureCode: number（必須）  
type: number（必須）

期待レスポンス（200）

    curl -i "http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?prefectureCode=13&year=2015&type=1"

例（body）

    {"year":2015,"prefectureCode":13,"prefectureName":"東京都","type":1,"value":324740}

バリデーション例（400）

    curl -i "http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?prefectureCode=13&year=2014&type=1"
    curl -i "http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?prefectureCode=1&year=2015&type=1"

該当なし（404）は e2e でRepository差し替えにより担保する（実データが完全に揃っている場合、バリデーション通過後に404が発生しづらいため）

## データファイル

デフォルトの参照先

    assets/estate_transactions.json

差し替えたい場合は環境変数で指定する（リポジトリルートからの相対パス推奨）

    ESTATE_TRANSACTIONS_JSON_PATH=assets/estate_transactions.json

## Postman

コレクションをImportしてSendするだけで、200/400の代表ケースを再現できる

    postman/estate-transactions.postman_collection.json

## テスト

ユニットテスト

    npm run test

E2Eテスト

    npm run test:e2e

E2Eは test/e2e 配下に配置する  
ユニットは対象コードに近接配置（src配下の \*.spec.ts）を基本とする

## ディレクトリ方針

アプリの中心は以下の構造で実装する

src/modules/town-planning/estate-transaction

- presentation: Controller / DTO / Validator（HTTP入出力とバリデーション）
- usecase: ユースケース（業務処理の起点）
- domain: 型、Repository抽象、仕様固定の制約、DIトークン
- infrastructure: JSONのロード/索引など永続化の実装

Controllerにビジネスロジックを置かない  
UseCaseはRepository抽象に依存する  
Infrastructureのみがデータアクセス（JSON）を知る
