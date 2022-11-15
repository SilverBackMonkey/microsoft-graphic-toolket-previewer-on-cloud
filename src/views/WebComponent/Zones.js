export const Definition = [
    {
      zone: "appearances",
      component: "HeadingColorAndSize",
      name: ["headingColor", "headingSize"],
      createSeparateSection: true,
      title: "Heading",
    },
    {
      zone: "appearances",
      component: "TextBox",
      name: "title",
      displayName: "Title",
    },
    {
      zone: "appearances",
      component: "TextBox",
      name: "description",
      displayName: "Description",
      createSeparateSection: true,
      title: "Description",
    },
    {
      zone: "appearances",
      component: "BackgroundType",
      name: ["typeSelected", "changeBgColor", "changeBgOverlay", "selectedImage"],
      displayName: "Background Type",
      createSeparateSection: true,
      title: "Background Type",
    },
    {
      zone: "layout",
      component: "ComponentLayout",
      name: ["layout", "layoutSpacing"],
      enum: ["list", "grid", "masonry"],
    },
    {
      component: "TextBox",
      name: "query",
      displayName: "Query",
    },
    {
      component: "TextBox",
      name: "siteid",
      displayName: " Site Id",
    },
    {
      component: "TextBox",
      name: "driveid",
      displayName: " Drive Id",
    },
    {
      component: "TextBox",
      name: "itemid",
      displayName: " Item Id",
    },
    {
      component: "TextBox",
      name: "listid",
      displayName: " List Id",
    },
    {
      component: "TextBox",
      name: "listname",
      displayName: " List Name",
    },
    {
      component: "TextBox",
      name: "maxresults",
      displayName: " Max Results",
    },
    {
      component: "TextBox",
      name: "pagination",
      displayName: " Pagination",
    },
    {
      component: "TextBox",
      name: "sort",
      displayName: "Sort",
    },
    {
      component: "TextBox",
      name: "columns",
      displayName: " Columns",
    },
    {
      component: "TextBox",
      name: "lookups",
      displayName: " Lookups",
    },
    {
      component: "TextBox",
      name: "searchparam",
      displayName: " Search Param",
    },
    {
      component: "TextBox",
      name: "includefile",
      displayName: " Include File",
    },
    {
      component: "TextBox",
      name: "folderurl",
      displayName: " Folder Url",
    },
    {
      component: "TextBox",
      name: "folderid",
      displayName: " Folder Id",
    },
    {
      component: "TextBox",
      name: "autoloadresult",
      displayName: " Auto Load Result",
    },
    {
      component: "TextBox",
      name: "searchform",
      displayName: " Search Form",
    },
    {
      component: "TextBox",
      name: "autocomplete",
      displayName: " Auto Complete",
    }
  ];