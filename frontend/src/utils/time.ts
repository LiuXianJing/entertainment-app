/**
 * 
 * @param seconds 秒数
 * @returns 转换为例如01:01:01格式的时间
 */
export const transformToTime = (seconds: number) => {
    seconds = Math.round(seconds)
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    const res: string = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
 
    return res
}
