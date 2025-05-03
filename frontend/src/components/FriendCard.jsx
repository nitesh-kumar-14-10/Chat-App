import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-[#0A1128] border border-base-300 hover:shadow-lg transition-all duration-200 rounded-xl">
      <div className="card-body p-5 text-white">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <h3 className="font-semibold text-base truncate">{friend.fullName}</h3>
        </div>

        {/* LANGUAGE BADGES */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-primary badge-sm text-white flex items-center gap-1 px-2 py-1">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline badge-sm text-white flex items-center gap-1 px-2 py-1 border-base-300">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* MESSAGE BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-primary w-full text-white border-white hover:bg-primary hover:text-white"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

// Utility function for language -> flag
export function getLanguageFlag(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="inline-block h-3 w-auto mr-1 rounded-sm"
      />
    );
  }
  return null;
}
