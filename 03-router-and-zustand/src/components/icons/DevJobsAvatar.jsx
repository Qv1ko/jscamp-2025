export function DevJobsAvatar({
  size = 32,
  service = "github",
  username = "qv1ko",
}) {
  const url = `https://unavatar.io/${service}/${username}`;

  return (
    <img
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
      }}
      src={url}
      alt={`Avatar de ${username}`}
      className="avatar"
    ></img>
  );
}
