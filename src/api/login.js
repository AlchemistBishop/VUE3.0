import service from '@/utils/request.js';
/*
获取验证码
*/ 
export function GetSms(data){
    service.request({
        method: 'get',
        url: '/getSms',
        data
    });
}

/**
 * 获取用户角色
 */