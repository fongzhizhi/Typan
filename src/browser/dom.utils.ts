/**
 * 安全获取元素
 * @description 使用选择器安全地获取 DOM 元素，失败返回 null
 * @param selector - CSS 选择器或标签名
 * @param parent - 父节点，默认为 document
 * @returns 匹配的元素或 null
 * @example
 * const button = getElement("button");
 * const input = getElement("#username");
 * const item = getElement(".item", container);
 */
export function getElement<K extends keyof HTMLElementTagNameMap>(
  selector: K | string,
  parent?: ParentNode | null,
): HTMLElementTagNameMap[K] | null {
  const root = parent || document;
  if (!root || typeof root.querySelector !== "function") return null;
  return root.querySelector(selector);
}

/**
 * 安全添加事件监听
 * @description 为元素添加事件监听器，返回清理函数
 * @param el - 目标元素
 * @param event - 事件名称
 * @param handler - 事件处理函数
 * @param options - 事件选项
 * @returns 清理函数，调用后移除监听器
 * @example
 * const cleanup = on(button, "click", () => console.log("clicked"));
 * // 稍后移除监听
 * cleanup();
 * @example
 * const cleanup = on(window, "scroll", handleScroll, { passive: true });
 */
export function on<K extends keyof HTMLElementEventMap>(
  el: EventTarget | null | undefined,
  event: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void {
  if (!el || typeof el.addEventListener !== "function") return () => {};
  el.addEventListener(event, handler as EventListener, options);
  return () => el.removeEventListener(event, handler as EventListener, options);
}

/**
 * 安全的 CSS 样式设置
 * @description 批量设置元素的 CSS 样式
 * @param el - 目标元素
 * @param styles - 样式对象
 * @example
 * setStyle(element, { color: "red", fontSize: "16px" });
 * setStyle(null, { color: "red" }); // 安全，不会报错
 */
export function setStyle(
  el: HTMLElement | null | undefined,
  styles: Partial<CSSStyleDeclaration>,
): void {
  if (!el || !el.style) return;
  Object.assign(el.style, styles);
}

/**
 * 安全添加类名
 * @description 为元素添加一个或多个类名（支持空格分隔）
 * @param el - 目标元素
 * @param className - 类名（可包含多个，用空格分隔）
 * @example
 * addClass(element, "active");
 * addClass(element, "btn btn-primary");
 * addClass(null, "active"); // 安全，不会报错
 */
export function addClass(
  el: HTMLElement | null | undefined,
  className: string,
): void {
  if (!el || !el.classList) return;
  el.classList.add(...className.split(/\s+/).filter(Boolean));
}

/**
 * 安全移除类名
 * @description 从元素移除一个或多个类名（支持空格分隔）
 * @param el - 目标元素
 * @param className - 类名（可包含多个，用空格分隔）
 * @example
 * removeClass(element, "active");
 * removeClass(element, "btn btn-primary");
 */
export function removeClass(
  el: HTMLElement | null | undefined,
  className: string,
): void {
  if (!el || !el.classList) return;
  el.classList.remove(...className.split(/\s+/).filter(Boolean));
}

/**
 * 检查是否包含类名
 * @description 检查元素是否包含指定类名
 * @param el - 目标元素
 * @param className - 类名
 * @returns 如果包含返回 true，否则返回 false
 * @example
 * if (hasClass(element, "active")) {
 *   console.log("元素处于激活状态");
 * }
 */
export function hasClass(
  el: HTMLElement | null | undefined,
  className: string,
): boolean {
  if (!el || !el.classList) return false;
  return el.classList.contains(className);
}

/**
 * 切换类名
 * @description 如果元素包含该类名则移除，否则添加
 * @param el - 目标元素
 * @param className - 类名
 * @example
 * toggleClass(element, "active"); // 切换激活状态
 */
export function toggleClass(
  el: HTMLElement | null | undefined,
  className: string,
): void {
  if (!el || !el.classList) return;
  el.classList.toggle(className);
}
