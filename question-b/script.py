from packaging import version

# Function to compare two version strings using the packaging library
def compare_versions(version1, version2):

    # Parse the version strings using the packaging library
    parsed_version1 = version.parse(version1)
    parsed_version2 = version.parse(version2)

    # Compare the parsed versions
    if parsed_version1 < parsed_version2:
        return "Version 2 is greater"
    elif parsed_version1 > parsed_version2:
        return "Version 1 is greater"
    else:
        return "Versions are equal"


# Test cases
print(compare_versions("1.2", "1.1"))  # Version 1 is greater
print(compare_versions("1.1", "1.2"))  # Version 2 is greater
print(compare_versions("1.2", "1.2"))  # Versions are equal
print(compare_versions("1.2.3", "1.2.4"))  # Version 2 is greater
print(compare_versions("2.0", "1.9.9"))  # Version 1 is greater
