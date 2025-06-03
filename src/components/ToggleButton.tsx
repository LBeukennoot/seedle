import { styled, Switch } from "@mui/material";

const SwitchStyled = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    overflow: 'visible',

    '& .MuiSwitch-switchBase': {
        padding: 0,
        marginTop: -2.5,
        transitionDuration: '150ms',
        border: '5px solid var(--color-blue)',
        '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff',
            border: '5px solid var(--color-light-green)',

            '& + .MuiSwitch-track': {
                backgroundColor: 'var(--color-light-green)',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
            },
        },
        '&.Mui-disabled': {
            border: '5px solid var(--color-light-blue)',
            opacity: 0.7
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        boxShadow: 'none'
    },
    '& .MuiSwitch-track': {
        borderRadius: 500,
        backgroundColor: 'var(--color-light-blue)',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 150,
        })
    },
}));

export default function ToggleButton({ setValue, checked }: any) {

    return (
        <SwitchStyled
            disableRipple
            checked={checked}
            onChange={({target: {checked}}) => setValue(checked)}
        />
    )
}