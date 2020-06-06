function outOfOrder(arr: number[]) {
    let m = arr.length - 1;
    while (m > 0) {
        // 向下取整，自动排除最后一个元素，最后一个随机数一定是0
        const index = Math.floor(Math.random() * m);
        console.log(`index is ${index}`);
        [arr[m], arr[index]] = [arr[index], arr[m]]
        // const tmp = arr[m];
        // arr[m] = arr[index];
        // arr[index] = tmp;
        m--;
    }
    return arr;
}

const arr = [1, 2, 3, 4]
const res = outOfOrder(arr)
console.log(res.toString())

