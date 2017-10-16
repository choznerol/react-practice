import { INITIAL_STORE_STATE } from './index.jsx'

const message = (state = INITIAL_STORE_STATE.message, action) => {
    switch (action.type) {

        // 操作成功
        case 'PATCH_PROFILE_FULFILLED':
            return {
                visible: true,
                text: action.message_text,
                bs_style: 'primary'
            }

        // 操作失敗
        case 'FETCH_HEROS_REJECTED':
        case 'FETCH_PROFILE_REJECTED':
        case 'PATCH_PROFILE_REJECTED':
            return {
                visible: true,
                text: composeMessageText(action.message_text, action.err),
                bs_style: 'danger'
            }

        // 關閉提示訊息（切換卡片、手動關閉）
        case 'CLEAR_MESSAGE':
            return { visible: false }
        default:
            return state
    }
}

const composeMessageText = (text, err) => {
    return err && err.message ?
        `${text}（錯誤原因：${err.message}）` : text
}

export default message
