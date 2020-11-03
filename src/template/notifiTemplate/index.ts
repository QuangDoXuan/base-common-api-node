import {
  TargetType
} from '../../common/enum'

const addFollow = (user: { id: number, name: string }) => {
  return `<strong>${user.name}</strong>さんがあなたのドアをフォローしました!`
}

const createComment = (user: { id: number, name: string }, title: string) => {
  return `<strong>${user.name}</strong>さんがあなたの投稿にコメントしました!`
}
// Topic
const createTopic = (owner: { id: number, name: string }) => {
  return`<strong>${owner.name}</strong>さんが記事を投稿しました!`
}

// LiveStream
const createLiveStream = (owner: { id: number, name: string }, title: string) => {
  return`<strong>${owner.name}</strong>さんが ${title}をライブ配信中しました`
}

// Upload Video 
const uploadVideo = (owner: { id: number, name: string }, title: string) => {
  return`<strong>${owner.name}</strong>さんが動画を投稿しました:${title}`
}

const createPackage = (owner: { id: number, name: string }, title: string) => {
  return `<strong>${owner.name}</strong>さんがパッケージを作成しました: ${title}`
}

const addLike = (user: { id: number, name: string }) => {
  return `<strong>${user.name}</strong>さんがあなたのコンテンツに「グッド」しました。`
}

const subscribeToOwner = (user: { id: number, name: string }, title?: string) => {
  return `<strong>${user.name}</strong>さんがあなたのドアを入会しました!`
}
const subscribeToUser = (user: { id: number, name: string }, title?: string) => {
  return `<strong>${title}</strong>ドアを入会しました!`
}

const unSubscribeToOwner = (user: { id: number, name: string }, title?: string) => {
  return `<strong>${user.name}</strong>さんがあなたのドアを退会しました!`
}
const unSubscribeToUser = (user: { id: number, name: string }, title?: string) => {
  return `<strong>${title}</strong>ドアを退会しました!`
}
const extensionSuccess= (user: { id: number, name: string }, title?: string) => {
  return `<strong>${title}</strong>のプランが自動的に更新されました。`
}
const extensionDenied= (user: { id: number, name: string }, title?: string) => {
  return `<strong>${title}</strong>のプランが自動的に更新が失敗しました。`
}

export {
  addFollow,
  createComment,
  createTopic,
  createLiveStream,
  uploadVideo,
  addLike,
  subscribeToOwner,
  subscribeToUser,
  unSubscribeToOwner,
  unSubscribeToUser,
  createPackage,
  extensionSuccess,
  extensionDenied
}