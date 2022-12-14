let debounceTimer = null;
export function debounce(callback, duration) {
    return function (...args) {
        let ctx = this;
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log('定时器函数执行了')
            callback.apply(ctx, args);
        }, duration);
    };
}
