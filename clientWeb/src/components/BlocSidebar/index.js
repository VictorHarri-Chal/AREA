import React, { useState } from 'react'
import { BSAppName, BSContainer, BSLogoApp, BSConnectBtn, BSConnected, BSActionRea, BSBlocContainer, BSBloc} from './BSElements'

const BlocSidebar = ({ appSelected }) => {

    const [actionRea, setActionRea] = useState(true)

    const toggleActionRea = (which) => {
        if (which === actionRea) return
        setActionRea(!actionRea)
    }

    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
            <BSAppName color={appSelected.color}>{appSelected.title}</BSAppName>

            <BSConnectBtn color={appSelected.color} login={appSelected.login}>Connect</BSConnectBtn>
            <BSConnected color={appSelected.color} login={appSelected.login}>Connected</BSConnected>

            <BSActionRea color={appSelected.color} actionRea={actionRea} onClick={() => toggleActionRea(true)} login={appSelected.login} which={false}>Action</BSActionRea>
            <BSActionRea color={appSelected.color} actionRea={!actionRea} onClick={() => toggleActionRea(false)} login={appSelected.login} which={true}>Reaction</BSActionRea>

            {appSelected && appSelected.login ? (
                <BSBlocContainer>
                    {(actionRea && "action_blocs" in appSelected ? appSelected.action_blocs : "reaction_blocs" in appSelected ? appSelected.reaction_blocs : []).map((item, index) => {
                        return <BSBloc key={index} color={appSelected.color}>{item.title}</BSBloc>
                    })}
                </BSBlocContainer>)
            : (<></>)}
        </BSContainer>
    )
}

export default BlocSidebar
