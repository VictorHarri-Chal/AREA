import React from 'react'

const ClientApk = () => {
        const handleDownloadClick = () => {
          fetch('/download')
            .then((response) => {
              if (!response.ok) {
                throw new Error('Une erreur est survenue lors du téléchargement.');
              }
              return response.blob();
            })
            .then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'client.apk');
              document.body.appendChild(link);
              link.click();
            })
            .catch((err) => {
              // Gérer les erreurs de téléchargement
              console.error(err);
            });
        };
      
        return (
          <button onClick={handleDownloadClick}>
            Télécharger l'application
          </button>
        );
}

export default ClientApk;