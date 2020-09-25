import styled from 'styled-components';
import React from "react";
import {RootStateType} from "../../index";
import {connect} from "react-redux";
import {CircularProgress} from "@material-ui/core";

const Indicator = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
z-index: 666;
background-color: gray;
opacity: 0.5;
display: flex;
justify-content: center;
align-items: center;
`

const IndicatorContent = styled.div`
max-height: 50px;
`


function BusyIndicator(props: {isBusy: boolean}){

    return <div style={{visibility: props.isBusy ? 'visible' : 'hidden'}}>
        <Indicator>
            <IndicatorContent>
                <CircularProgress />
            </IndicatorContent>
        </Indicator>
    </div>

}

const mapStateToProps = (state: RootStateType) => ({
    isBusy: state.busyIndicator.value,
})

export default connect(
    mapStateToProps
)(BusyIndicator);
