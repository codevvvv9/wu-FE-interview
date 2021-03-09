/**
 * 两数之和，返回数组中合适元素的下标数组
 * @param { number[] } array 
 * @param { number } target 
 * @returns { number[] }
 */
function twoSum(array, target) {
    //双指针法
    for (let p1 = 0; p1 < array.length; p1++) {
        let targetFind = target - array[p1];
        for (let p2 = p1 + 1; p2 < array.length; p2++) {
            if (targetFind === array[p2]) {
                return [p1, p2];
            }

        }

    }
    return []
}

const arr = [1, 3, 5, 7, 9, 2]
const target = 8
console.log(twoSum(arr, target))