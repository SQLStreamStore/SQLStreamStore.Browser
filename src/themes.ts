import { createMuiTheme, PaletteType, Theme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Observable } from 'rxjs';
import { createAction, createState } from './reactive';

const palette = (type: PaletteType): PaletteOptions => ({
    action: {
        active: '#42c0fb',
    },
    type,
});

const typography = {
    useNextVariants: true,
};

const createTheme = (type: PaletteType) =>
    createMuiTheme({
        palette: palette(type),
        typography,
    });

const actions = {
    type: createAction<void>(),
};

const paletteTypeKey = 'paletteType';

const loadPaletteType = (): PaletteType => {
    const type = window.localStorage.getItem(paletteTypeKey);
    return type === 'dark' ? 'dark' : 'light';
};

const savePaletteType = (type: PaletteType) =>
    window.localStorage.setItem(paletteTypeKey, type);

const defaultTheme = createTheme(loadPaletteType());

interface ThemeState {
    theme: Theme;
}

const theme$ = createState<ThemeState>(
    actions.type.map(() => [
        'theme',
        ({ palette: { type } }: Theme) =>
            createTheme(type === 'light' ? 'dark' : 'light'),
    ]),
    Observable.of({
        theme: defaultTheme,
    }),
).map(({ theme }) => theme);

theme$.subscribe(({ palette: { type } }) => savePaletteType(type));

export default {
    actions,
    defaultTheme,
    theme$,
};
