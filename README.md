## Tester

![Tester](Icon.png "Tester")  

Testerは,Web系の幾つかの技術をテストすることのできる軽量ツールです。 
 
[Tester を開く](https://akimikimikimikimikimikimika.github.io/Tester/Tester.html "Tester")  

[ソースコード](https://github.com/akimikimikimikimikimikimika/Tester/ "ソースコード")

### 基本
- 一番最初に開いた時には,上部のボタンで種別を選択してからコードを記述する。
- コードエディッタの領域と結果表示の領域があり,縦分割/横分割は切り替えられる。また,セパレータを動かすことで,それらの大きさを調節できる。
- “▶”を︎押すと,記述したコードを実行し,その結果を表示する。
- それぞれの種別において,新規書類を開いた際にテンプレートが読み込まれ,簡単に使い始められる。

### タブ
- 現在作業中の書類をタブで表示する。
- タブを押すことで,表示を切り替えられる。
- 開いているタブを押すと,書類の削除/名称変更/言語切り替えができる。
- “＋”を︎押すと,新規書類を作成する。

### 各種ボタン
- “▶”を︎押すと,記述したコードを実行し,その結果を表示する。
- HTMLにおいて表示される“︎◀︎”を︎押すと,プレビュー上で編集した内容をコードに反映する。
- HTMLにおいて表示される“︎✉️”を︎押すと,メールを作成する。このボタンから,一部のデバイスでは,コードの内容に従いHTMLメールが作成される。だが,多くのデバイスでは,メール本文にHTMLコードがそのまま挿入されてしまう。
- “︎↔︎”を︎押すと,2つの領域を分割する方向 (横方向/縦方向) を変更する。
- “︎D”を︎押すと,ダークモードのオン/オフを切り替えれられる。ブラウザでダークモードをサポートしている場合は表示されない。

### テストできる内容
- HTML  
	HTMLの本文 ( `<body>` ~ `</body>` の間に含まれる内容) をテストできる。HTMLコードをプレビューで表示できるだけでなく,WYSIWYGで編集した内容をソースコードに戻すこともできる。
- JavaScript  
	JavaScriptをテストできる。  
	一部のコンソールにも対応し,エラーを表示することもできる。
- HTML (full)  
	HTML文書全体をテストできる。
- SVG  
	SVGをテストできる。
- Canvas 2D  
	2Dコンテクストのcanvasをテストできる。  
	こちらはJavaScriptで記載するのだが,JavaScriptの項目とは違い,簡素な機能のみを実装する。
- MathML  
	MathMLをテストできる。

### JavaScript テストにおける機能

- Web Worker
	記述したコードをWeb Worker上で実行することができ,Web Worker上での動作をテストすることができる。  
	`"use strict";` のように,コード先頭に次の指定をすることで実行環境を変更できる。
	| 指定 | モード |
	|:---:|:------|
	| `"main";` | メインページ上で実行 |
	| `"worker";` | Web Worker ワークレット上で実行 |
	| 指定なし | メインページ上で実行 |

- ライブラリ
	JavaScriptのテスト項目において外部ライブラリを容易に読み込むことができる。  
	`use(` *`identifier`* `)` でライブラリを読み込み,Promiseを返す。Promiseは解決され,戻り値として読み込みの成否を真偽値で示す。  
	`canIUse(` *`identifier`* `)` はライブラリが使える状態にあるかどうかを示す函数。`use()` 以外の方法で読み込んだライブラリは認識しない。  
	両方の函数において, *`identifier`* には以下の文字列を指定可能

	| 指定 | モード |
	|:---:|:------|
	| `"Color"` | [Colorライブラリ](https://akimikimikimikimikimikimika.github.io/Library/Color/ "Colorライブラリ") |
	| `"Math"` | [Mathライブラリ](https://akimikimikimikimikimikimika.github.io/Library/Math/ "Mathライブラリ") |
	| `"jQuery"` | jQuery |
	| `"<URL>"` | 指定したURLのライブラリを読み込み,利用する。 |


### 特記事項
- JavaScript,CSSを無効にすると利用できない。
- 同じURLでそのままデスクトップでも,モバイルでも利用できる。
- Internet Explorerでは利用できない。
- iOSデバイスでは,ホーム画面にアイコンを追加すると,スタンドアロンで開く。
- iPhone X 対応。

### 更新内容
- MathMLを改良し,新たに SVG,Canvas 2D を実装
- その他,ソースコードを改良し,一部の機能を修正