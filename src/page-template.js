const generateTitle = infoText => {
    if (!infoText) {
        return '';
    }
    return `
    ${titleText}
    ${descriptionText}
    ${InstallationText}
    ${UsageText}
    ${ContributorsText}
    ${TestsText}
    
    `;
}; 