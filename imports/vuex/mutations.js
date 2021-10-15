var colorSidebarList = [
    "#28a745",
    "#9c27b0",
    "#00cae3",
    "#ff9800",
    "#e91e63",
    "#ff5252",
];
export default {
    setUser(state, value) {
        state.currentUser = value;
        if (value && value != null) {
            state.isDark = value.profile.isDark;
            state.mode = colorSidebarList[value.profile.sideColorFilter];
            state.sideColorFilter = value.profile.sideColorFilter;
            state.drawerBackground = value.profile.imgBackground;
            state.isSideBarImage = value.profile.isSideBarImage;
            state.language = value.profile.language;
            state.isDense = value.profile.dense;
        }
    },
    setModule(state, value) {
        state.currentModule = value;
    }
};