import {http} from "../plugins/axios"
import {ChapterList} from './chapterApi'
export type BookName={
    name:string
}
export type BookId={
    id:string
}
export type BookInfo=BookId&BookName
export type BookList={
    books:BookInfo[]
}

function create(data:BookName){
    return http.request<BookId>({url:`newBook`,method:'post',data})
}
function getAllBook(){
    return http.request<BookList>({url:`getbooks`})
}
function getChapters(data:BookId){
    return http.request<ChapterList>({url:`getChapters?id=${data.id}`})
}
function updateBookName(data:BookInfo){
    return http.request<{}>({url:`updateBookName`,method:'post',data})
}
function deleteBook(data:BookId){
    return http.request<{}>({url:`deleteBook`,method:'post',data})
}
export default {create,getAllBook,getChapters,updateBookName,deleteBook}