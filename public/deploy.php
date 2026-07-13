<?php
// Simple & Secure cPanel deployment script for MSSF
// Bypasses cPanel FTP firewalls by downloading the build directly from GitHub via HTTPS.

// Load secret key securely from outside web root if present
$secret_key = "mssf_deploy_key_2026"; // Fallback default
$config_file = dirname(dirname(__FILE__)) . '/deploy_config.php';
if (file_exists($config_file)) {
    include($config_file);
    if (defined('MSSF_DEPLOY_KEY')) {
        $secret_key = MSSF_DEPLOY_KEY;
    }
}

if (!isset($_GET['key']) || $_GET['key'] !== $secret_key) {
    header('HTTP/1.0 403 Forbidden');
    echo "Unauthorized access.";
    exit;
}

$repo = "iamGoldenOla/mssf";
$branch = "build";
$zipUrl = "https://codeload.github.com/$repo/zip/refs/heads/$branch";
$zipFile = "build.zip";

// Ensure errors are reported for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/html; charset=utf-8');
echo "<h2>MSSF Auto-Deployment</h2>";
echo "Downloading build package from GitHub...<br>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $zipUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'MSSF-Deployer');
$data = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200 || !$data) {
    die("<span style='color:red;'>Error: Failed to download build files. HTTP Status Code: $http_code</span>");
}

file_put_contents($zipFile, $data);
echo "Package downloaded successfully. Unzipping files...<br>";

if (!class_exists('ZipArchive')) {
    die("<span style='color:red;'>Error: ZipArchive PHP extension is not enabled on this hosting account. Please contact host support.</span>");
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo('.');
    $zip->close();
    unlink($zipFile);
    
    // GitHub zip extracts to directory "mssf-build"
    $source = "mssf-build";
    if (is_dir($source)) {
        // Move files recursively
        function moveFiles($src, $dst) {
            $dir = opendir($src);
            if (!is_dir($dst)) {
                mkdir($dst, 0755, true);
            }
            while (($file = readdir($dir)) !== false) {
                if ($file != '.' && $file != '..') {
                    if (is_dir($src . '/' . $file)) {
                        moveFiles($src . '/' . $file, $dst . '/' . $file);
                    } else {
                        copy($src . '/' . $file, $dst . '/' . $file);
                        unlink($src . '/' . $file);
                    }
                }
            }
            closeddir($dir);
            rmdir($src);
        }
        
        moveFiles($source, ".");
        echo "<span style='color:green;'><b>SUCCESS: Deployment completed successfully! Your website is live.</b></span>";
    } else {
        echo "<span style='color:red;'>Error: Extracted folder 'mssf-build' not found. Check if branch name matches.</span>";
    }
} else {
    echo "<span style='color:red;'>Error: Failed to unzip the build package.</span>";
}
?>
