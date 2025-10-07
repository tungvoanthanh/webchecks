function getAllDeviceInfo() {
    document.getElementById("deviceList").innerHTML = getSupportedConstraints();

    navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device) => {
            document.getElementById("deviceList").innerHTML += getDeviceInfo(device);
        });
    });
}

function getSupportedConstraints() {
    let scHtml = "";
    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    for (const constraint of Object.keys(supportedConstraints)) {
        scHtml += `[${constraint}]`;
    }

    return `
        <fieldset>
            <legend><b>Supported Constraints</b></legend>
            ${scHtml}
        </fieldset>
    `;
}

function getDeviceInfo(device) {
    let infoHtml = "";
    for (const key in device) {
        if (typeof(device[key]) == "string") {
            infoHtml += `<b>${key}</b>: ${device[key]};<br>`;
        }
    }
    if (device.getCapabilities) {
        capsHtml = "";
        let caps = device.getCapabilities();
        for (const key in caps) {
            capValue = JSON.stringify(caps[key]);
            capsHtml += `<b>${key}</b>: ${capValue};<br>`;
        }
        infoHtml += `<br>
            <fieldset>
                <legend>Capabilities</legend>
                ${capsHtml}
            </fieldset>
        `;
    }

    return `
        <fieldset>
            <legend><b>${device.label}</b></legend>
            ${infoHtml}
        </fieldset>
    `;
}
