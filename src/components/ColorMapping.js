const colorMap = {
    world :         ["MediumSlateBlue","white"],
    politics :      ["CadetBlue","white"],
    business :      ["CornFlowerBlue","white"],
    technology :    ["YellowGreen","black"],
    sports :        ["Goldenrod","black"],
    sport :         ["Goldenrod","black"],
    guardian :      ["MidnightBlue","white"],
    nytimes :       ["LightGrey","black"],
    others :        ["SlateGray","white"],
}

const ColorMap = (color) =>
{
    if (color in colorMap)
    {
        return colorMap[color];
    }
    return colorMap["others"];
}
export default ColorMap