import api from './api'
const get_notice_url="/notifications/user-notice";
const marked_as_read='/notifications/read'
const unread_count='/notifications/unread-count'

export const getAllNotifications=async()=>{
    const response=api.get(get_notice_url);
    return response;
}

export const markAsRead=async(id)=>{
    const response=api.put(`${marked_as_read}/${id}`)
    return response;
}


export const getUnreadCount=async()=>{
    const response=api.get(unread_count);
    return response;
}
