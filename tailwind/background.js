import colors from "./colors"

module.exports = {
    light: {
        white: {
            DEFAULT: colors.neutral.dpop.black[1],
            constant: colors.neutral.dpop.black[1],
            inputfield: `${colors.neutral.dpop.black[1]}66`,
            pale: colors.neutral.dpop.black[2],
            gentle: colors.neutral.dpop.black[4],
            sheen: colors.neutral.dpop.black[5],
            bold: colors.neutral.dpop.black[12],
            disabled: colors.neutral.dpop.black[3],
            primary: {
                pale: colors.primary.dpop[50],
                sheen: colors.primary.dpop[100],
                normal: {
                    DEFAULT: colors.primary.dpop[500],
                    constant: colors.primary.dpop[500]
                },
                bold: colors.primary.dpop[600],
                extrabold: colors.primary.dpop[800],
                secondary: {
                    pale: colors.secondary.dpop[50],
                    bold: colors.secondary.dpop[900],
                    constant: colors.secondary.dpop[900]
                },
                success: {
                    pale: colors.success.dpop[50],
                    bold: colors.success.dpop[500],
                },
                pending: {
                    pale: colors.pending.dpop[50],
                    bold: colors.pending.dpop[500]
                },
                warning: {
                    pale: colors.warning.dpop[50],
                    bold: colors.warning.dpop[500]
                },
                info: {
                    pale: colors.info.dpop[50],
                    bold: colors.info.dpop[500]
                }

                
            }
        },
    },
    dark: {

    }
   

}