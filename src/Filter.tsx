import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';
import {connect, useDispatch} from 'react-redux';
import {setSelectedDataSourcesAction, setSelectedCampaignsAction} from './app/filterReducer';
import {RootStateType} from "./index";
import {toggleBusyAction} from "./app/busyIndicator/busyIndicatorReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
`

function Filter(props: {items: string[], label: string, onChange: (aa:any) => void }) {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(toggleBusyAction())
        setSelectedItems(event.target.value as string[]);
        props.onChange(event.target.value as string[]);
        dispatch(toggleBusyAction())
    };
    return <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{props.label}</InputLabel>
        <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedItems}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
                <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                </div>
            )}
            MenuProps={MenuProps}
        >
            {props.items.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, selectedItems, theme)}>
                    {name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}


export interface IFilterOwnProps{
    allCampaigns: string[];
    allDataSources: string[];
}

export interface IFilterDispatchProps {
    setSelectedCampaignsAction;
    setSelectedDataSourcesAction;
}

const mapStateToProps = (state: RootStateType, ownProps: IFilterOwnProps) => ({
    allCampaigns: ownProps.allCampaigns,
    allDataSources: ownProps.allDataSources
})

const dispatchProps: IFilterDispatchProps = {
    setSelectedCampaignsAction,
    setSelectedDataSourcesAction
}

export const FilterView: React.FC<IFilterDispatchProps & IFilterOwnProps> = props => {
    return (
        <FilterColumn>
            <Filter items={props.allDataSources} label="Data sources" onChange={props.setSelectedDataSourcesAction}/>
            <Filter items={props.allCampaigns} label="Campaigns" onChange={props.setSelectedCampaignsAction}/>
        </FilterColumn>
    );
}

export const Filters = connect(
    mapStateToProps,
    dispatchProps
)(FilterView);
