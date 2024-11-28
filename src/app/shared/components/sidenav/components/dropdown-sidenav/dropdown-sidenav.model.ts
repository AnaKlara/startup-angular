export interface dropdownSubItem {
  title: string;
  link: string;
}

export interface dropdownSidenav {
  title: string;
  icon?: string;
  link?: string;
  itens?: dropdownSubItem[];
}
