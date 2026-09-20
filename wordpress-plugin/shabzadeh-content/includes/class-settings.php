<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The plugin's top-level admin page: a short overview of the content
 * types plus the one setting the frontend needs — which origin is
 * allowed to call the REST API (CORS).
 */
class SH_Settings {

	const OPTION_NAME    = 'sh_allowed_origin';
	const NONCE_ACTION   = 'sh_save_settings';
	const NONCE_NAME     = 'sh_settings_nonce';
	const DEFAULT_ORIGIN = 'https://shabzadeh.mahdiroozbahani.com';

	public static function init() {
		add_action( 'admin_post_sh_save_settings', array( __CLASS__, 'handle_save' ) );
	}

	public static function get_allowed_origin() {
		$value = get_option( self::OPTION_NAME, self::DEFAULT_ORIGIN );
		return $value ? $value : self::DEFAULT_ORIGIN;
	}

	public static function handle_save() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'دسترسی غیرمجاز.' );
		}
		if ( ! isset( $_POST[ self::NONCE_NAME ] ) || ! wp_verify_nonce( $_POST[ self::NONCE_NAME ], self::NONCE_ACTION ) ) {
			wp_die( 'درخواست نامعتبر است.' );
		}

		$origin = isset( $_POST['sh_allowed_origin'] ) ? sanitize_text_field( wp_unslash( $_POST['sh_allowed_origin'] ) ) : '*';
		update_option( self::OPTION_NAME, $origin );

		wp_safe_redirect( admin_url( 'admin.php?page=' . SH_Post_Types::MENU_SLUG . '&updated=1' ) );
		exit;
	}

	public static function render_page() {
		$rest_base = rest_url( 'shabzadeh/v1' );
		$origin    = self::get_allowed_origin();
		?>
		<div class="wrap" dir="rtl">
			<h1>شب‌زده — مدیریت محتوای سایت</h1>

			<?php if ( isset( $_GET['updated'] ) ) : ?>
				<div class="notice notice-success"><p>تنظیمات ذخیره شد.</p></div>
			<?php endif; ?>

			<p>از منوی سمت راست، داستان‌ها، فصل‌های داستان، سفرنامه‌ها، قسمت‌های سفرنامه، عکس‌ها و ویدیوها را مدیریت کنید. هر محتوا باید هم نسخه‌ی فارسی و هم نسخه‌ی انگلیسی داشته باشد.</p>

			<h2>آدرس REST API</h2>
			<p>فرانت‌اند سایت محتوا را از این آدرس می‌خواند:</p>
			<code><?php echo esc_html( $rest_base ); ?></code>

			<h2>تنظیمات دسترسی (CORS)</h2>
			<p>آدرس دامنه‌ی فرانت‌اند را وارد کنید تا فقط آن سایت بتواند به این محتوا دسترسی داشته باشد (از قبل روی <code><?php echo esc_html( self::DEFAULT_ORIGIN ); ?></code> تنظیم شده). برای اجازه به همه (مناسب فقط برای توسعه) <code>*</code> بگذارید.</p>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="sh_save_settings" />
				<?php wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME ); ?>
				<input type="text" name="sh_allowed_origin" class="regular-text" dir="ltr" value="<?php echo esc_attr( $origin ); ?>" placeholder="<?php echo esc_attr( self::DEFAULT_ORIGIN ); ?>" />
				<?php submit_button( 'ذخیره تنظیمات' ); ?>
			</form>
		</div>
		<?php
	}
}
