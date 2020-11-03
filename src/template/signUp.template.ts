export default function (data: {  link: string }) {
  return {
    subject: `【Hibiki】 メールアドレスの確認!`,
    html: `<p> 
    <strong> メールアドレスを確認するには、次のリンクをクリックしてください。</strong>
     <a href='${data.link}'> 確認</a></p>
     <p>このアドレスの確認を依頼していない場合は、このメールを無視してください。</p>
     <p>よろしくお願いいたします。</p>
     `
  }
}