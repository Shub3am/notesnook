"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineListItemComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const rebass_1 = require("rebass");
const icon_1 = require("../../toolbar/components/icon");
const icons_1 = require("../../toolbar/icons");
const core_1 = require("@tiptap/core");
const outlinelist_1 = require("../outline-list/outlinelist");
const toolbarstore_1 = require("../../toolbar/stores/toolbarstore");
function OutlineListItemComponent(props) {
    var _a, _b;
    const { editor, updateAttributes, node, getPos, forwardRef } = props;
    const isMobile = (0, toolbarstore_1.useIsMobile)();
    const isNested = ((_a = node.lastChild) === null || _a === void 0 ? void 0 : _a.type.name) === outlinelist_1.OutlineList.name;
    const isCollapsed = isNested && ((_b = node.lastChild) === null || _b === void 0 ? void 0 : _b.attrs.collapsed);
    const onClick = () => {
        const [subList] = (0, core_1.findChildren)(node, (node) => node.type.name === outlinelist_1.OutlineList.name);
        if (!subList)
            return;
        const { pos } = subList;
        editor.commands.toggleOutlineCollapse(pos + getPos() + 1, !isCollapsed);
    };
    return ((0, jsx_runtime_1.jsxs)(rebass_1.Flex, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Flex, Object.assign({ className: "outline", sx: {
                    flexDirection: "column",
                    alignItems: "center",
                    mt: isMobile ? "0px" : "3px"
                } }, { children: [isNested ? ((0, jsx_runtime_1.jsx)(icon_1.Icon, { path: isCollapsed ? icons_1.Icons.chevronRight : icons_1.Icons.chevronDown, title: isCollapsed
                            ? "Click to uncollapse list"
                            : "Click to collapse list", sx: {
                            cursor: "pointer",
                            transition: `all .2s ease-in-out`,
                            ":hover": {
                                transform: ["unset", "scale(1.3)"]
                            },
                            ":active": {
                                transform: ["scale(1.3)", "unset"]
                            },
                            ".icon:hover path": {
                                fill: "var(--checked) !important"
                            }
                        }, size: isMobile ? 24 : 18, onMouseDown: (e) => e.preventDefault(), onTouchEnd: (e) => {
                            e.preventDefault();
                            onClick();
                        }, onClick: onClick })) : ((0, jsx_runtime_1.jsx)(icon_1.Icon, { path: icons_1.Icons.circle, size: isMobile ? 24 : 18, sx: { transform: "scale(0.4)" } })), isNested && !isCollapsed && ((0, jsx_runtime_1.jsx)(rebass_1.Box, { sx: {
                            flex: 1,
                            width: 1,
                            mt: 2,
                            backgroundColor: "border",
                            borderRadius: 50,
                            flexShrink: 0,
                            cursor: "pointer",
                            transition: `all .2s ease-in-out`,
                            ":hover": {
                                backgroundColor: "fontTertiary",
                                width: 4
                            }
                        }, contentEditable: false }))] })), (0, jsx_runtime_1.jsx)(rebass_1.Text, { ref: forwardRef, sx: {
                    pl: 1,
                    listStyleType: "none",
                    flex: 1
                } })] }));
}
exports.OutlineListItemComponent = OutlineListItemComponent;
