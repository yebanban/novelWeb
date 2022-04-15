import {http} from "../plugins/axios"
export type ChapterId ={
    id: string
}
export type ChapterName ={
    title: string
}
export type ChapterContent ={
    content: string
}
export type ChapterIdName=ChapterId&ChapterName
export type ChapterIdContent=ChapterId&ChapterContent
export type ParamsCreateChapter={
    bookId:string,
    chapterName:string
}
export type ChapterList={
    chapters:ChapterIdName[]
}
function create(data:ParamsCreateChapter){
    return http.request<ChapterId>({url:`newChapter`,method:'post',data})
}
function getChapterContent(data:ChapterId){
    return http.request<ChapterContent>({url:`getChapterContent?id=${data.id}`})
}
function updateChapterName(data:ChapterIdName){
    return http.request<{}>({url:`updateChapterName`,method:'post',data})
}
function updateChapterContent(data:ChapterIdContent){
    return http.request<{}>({url:`updateChapterContent`,method:'post',data})
}
function deleteChapter(data:ChapterId){
    return http.request<{}>({url:`deletechapter`,method:'post',data})
}
export default{create,getChapterContent,updateChapterName,updateChapterContent,deleteChapter}