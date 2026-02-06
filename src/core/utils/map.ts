/** 是否包含键 */
export function hasOwnKey() {

}

/** 获取Map上的值 */
export function getMapValue() {
    
}

/** 更新Map键值对 */
export function setMapValue() {

}

/** 删除Map键值对 */
export function deleteMapValue() {

}

/** 清空Map */
export function clearMap() {

}

/** 遍历Map */
export function iterateMap<K, V>(map: Map<K， V>, cb: (value: VTTCue, key: K, map: Map<K, V>) => boolean | void, safely = false): boolean {
    return false;
}

/**
 * 使用快照安全遍历Map
 * @description 避免一边遍历一边更新Map导致无限循环的情况, 由于存在性能问题, 与iterateMap区别开来
 */
export function iterateMapSanpshot() {

}

/** 异步遍历Map */
export function iterateMapAsync() {

}

/** 顺序遍历数组 */
export function iterateMapByOrder() {

}

/** 通过Map更新Map */
export function updateMapByMap() {

}

/** 通过Obj更新Map */
export function updateMapByObject() {

}

/** 通过Obj构建Map */
export function buildMapByObj() {

}

/** 获取Map所有的建 */
export function getMapKeys() {

}

/** 获取Map所有的值 */
export function getMapValues() {

}

/** Map浅克隆 */
export function shallowCloneMap() {

}

/** 获取Map中的第一个元素 */
export function getOneFromMap() {

}

/** 查询Map中的一个元素 */
export function queryOneFromMap() {

}
