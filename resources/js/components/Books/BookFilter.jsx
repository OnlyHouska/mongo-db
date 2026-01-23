export function BookFilter({ genres, selectedGenre, onGenreChange }) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="genre-filter" className="text-sm font-medium text-gray-700">
                Zanr:
            </label>
            <select
                id="genre-filter"
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Vsechny zanry</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
}
