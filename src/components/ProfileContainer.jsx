import { formatDateFns } from "../utils/helpers";
import Modal from "./Modal";
import ProfileEdit from "./ProfileEdit";

function ProfileContainer({profile}) {

    const [{avatar_url, first_name, last_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role, created_at, updated_at}] = profile;

 
    const date_joined = formatDateFns(created_at);
    const date_updated = formatDateFns(updated_at);

 
    return (
        <div className="p-8 ring-1 ring-gray-300 rounded-lg space-y-12 flex flex-col justify-center lg:px-12 lg:py-10">
            <div className="flex items-center gap-6">
                <picture className="w-32 h-32 rounded-full overflow-hidden ring ring-primary lg:w-40 lg:h-40">
                    <img src={avatar_url || "../team3.jpg"} alt="profile picture" className="w-full h-full object-cover" />
                </picture>
                <div className="space-y-1">
                    <h2 className="text-xl font-medium capitalize lg:text-3xl">
                        {first_name} {last_name}
                    </h2>
                    <p className="text-lg text-gray-700 font-medium lg:text-xl">{role || "User"}</p>
                    <p className="text-gray-700 lg:text-lg">100+ Posts</p>
                </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
                <h3 className="text-xl font-medium lg:text-2xl">Personal Information</h3>
                <ul className="grid grid-cols-2 gap-4 lg:gap-8">
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-lg  lg:text-xl">First Name:</span>
                        <span className="font-medium capitalize lg:text-lg">
                            {first_name}
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-lg  lg:text-xl">Last Name:</span>
                        <span className="font-medium capitalize lg:text-lg">
                            {last_name}
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-lg lg:text-xl">Date Joined:</span>
                        <span className="font-medium lg:text-lg">
                            {date_joined}
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-lg lg:text-xl">Date Updated:</span>
                        <span className="font-medium lg:text-lg">
                            {date_updated}
                        </span>
                    </li>
                </ul>
            </div>

            <div className="space-y-2 lg:space-y-3">
                <h3 className="text-xl font-medium lg:text-2xl">About Me</h3>
                <p className="text-gray-700 lg:text-lg">{bio || "No information available."}</p>
            </div>

            <div className="space-y-2 lg:space-y-3">
                <h3 className="text-xl font-medium lg:text-2xl">Links</h3>
                <div>
                    <a href={github_url || "#"} className="text-primary hover:underline lg:text-lg">GitHub</a>
                    <span className="mx-2 text-gray-500">|</span>
                    <a href={linkedIn_url || "#"} className="text-primary hover:underline lg:text-lg">LinkedIn</a>
                    <span className="mx-2 text-gray-500">|</span>
                    <a href={twitter_url || "#"} className="text-primary hover:underline lg:text-lg">Twitter</a>
                    <span className="mx-2 text-gray-500">|</span>
                    <a href={portfolio_url || "#"} className="text-primary hover:underline lg:text-lg">Portfolio</a>

                </div>
            </div>

            <Modal.Open opens={"profileEdit"}>
                <button className="bg-primary text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-primary-darker transition-colors lg:w-fit lg:text-lg">Edit Profile</button>
            </Modal.Open>
            <Modal.Window name="profileEdit">
                <ProfileEdit profile={profile} />
            </Modal.Window>
        </div>
    )
}

export default ProfileContainer
