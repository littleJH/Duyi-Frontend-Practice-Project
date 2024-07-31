const MenuConstants = {
  KEYNAME: 'data-key',
  OPENSTATUSNAME: 'data-open-status',
}

class Menu {
  constructor(options) {
    const { menuClassname, submenuClassname, activeClassname } = options;
    if (Menu.instance) return Menu.instance; // 确保单例模式
    Menu.instance = this;

    this.menuClassname = menuClassname;
    this.submenuClassname = submenuClassname;
    this.activeClassname = activeClassname;
    this.menuItems = [];
    this.activekey = null;

    this.init();
  }

  init() {
    const menuItems = document.querySelectorAll(`.${this.menuClassname}`);
    menuItems.forEach((item) => {
      const submenu = item.querySelector(`.${this.submenuClassname}`);
      const key = this.getAttribute(item, MenuConstants.KEYNAME);
      const open = this.getAttribute(item, MenuConstants.OPENSTATUSNAME) === 'true';

      const menuItem = {
        key,
        menuItem: item,
        submenuItem: submenu,
        open
      };

      this.menuItems.push(menuItem);

      item.addEventListener('click', () => {
        this.toggle(menuItem.key);
      });
    });
  }

  open(key) {
    this.menuItems.forEach(item => {
      if (item.key === key) {
        this.addClass(item.submenuItem, this.activeClassname);
        this.setAttribute(item.menuItem, this.openStatusName, 'true');
        item.open = true;
      } else {
        this.close(item.key); // 确保其他菜单项关闭
      }
    });
  }

  close(key) {
    this.menuItems.forEach(item => {
      if (item.key === key) {
        this.removeClass(item.submenuItem, this.activeClassname);
        this.setAttribute(item.menuItem, this.openStatusName, 'false');
        item.open = false;
      }
    });
  }

  toggle(key) {
    this.menuItems.forEach(item => {
      if (item.key === key) {
        if (item.open) {
          this.close(key);
        } else {
          this.open(key);
        }
      }
    });
  }

  closeAll() {
    this.menuItems.forEach(item => {
      this.removeClass(item.submenuItem, this.activeClassname);
      this.setAttribute(item.menuItem, this.openStatusName, 'false');
      item.open = false;
    });
  }

  refresh() {
    this.menuItems = [];
    this.init();
  }

  setActiveKey(key) {
    this.activekey = key;
    this.activekey && this.toggle(this.activekey);
  }

  getActiveKey() {
    return this.activekey;
  }

  setAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  getAttribute(element, name) {
    return element.getAttribute(name);
  }

  addClass(element, className) {
    element.classList.add(className);
  }

  removeClass(element, className) {
    element.classList.remove(className);
  }
}

const menu = new Menu({
  menuClassname: 'menu-item',
  submenuClassname: 'submenu-container',
  activeClassname: 'submenu-container-active'
});
