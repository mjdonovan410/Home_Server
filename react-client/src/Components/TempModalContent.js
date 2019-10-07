import React, {useEffect, useState} from 'react';

function TempModalContent(props) {
    const [deviceData, setData] = useState({"name":props.sensor.name, "temp":"#", "humid":"", "ipAddress":props.sensor.ipAddress});

    useEffect(() => {
    },[]);

    return (
        <div>
            <p>{deviceData.name}</p>
            <p>{deviceData.temp}</p>
            <p>{deviceData.humid}</p>
            <p>{deviceData.ipAddress}</p>
        </div>
    );
}

export default TempModalContent;
