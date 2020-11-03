export default function (data: { userName: string, link: string }) {
  return {
    subject: `【Lobby】 パスワードの再発行のお知らせ!`,
    html: `<p> <strong>${data.userName} 様!</strong></p>
            <p>この度は「Lobby」をご利用いただき、誠にありがとうございます。
            パスワードの再発行のご依頼を受け付けました。</p>
            <p>下記URLをクリックして、パスワードの再設定画面から 新しいパスワードを設定してください。</p>
            <p> <strong><a href='${data.link}'> パスワードを再設定する</a>.</strong></p>
            <p>このURLの有効期限は1時間間です。</p>
            <p>登録した覚えがないのにこのメールを受け取られた方は、お手数ですがこのメールを削除してください。 </p>
             <p>※このメールは送信専用メールアドレスから配信されています。</p>
            <p>このままご返信いただいてもお答えできませんのでご了承ください。</p>`
  }
}