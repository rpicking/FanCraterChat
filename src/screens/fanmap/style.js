const React = require("react-native");
const { Dimensions, Platform } = React;
const { width, height } = Dimensions.get("window");

export default {
    map: {
        width: width - 1,
        height: height,
        zIndex: -1
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)"
    },
    button: {
        position: "absolute",
        alignSelf: "flex-end",
        zIndex: 10
    }
};
